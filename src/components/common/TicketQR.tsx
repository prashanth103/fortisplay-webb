// A visually convincing, deterministic "fake" QR code — this is a kiosk UI
// mock, not a real encoder, so we don't pull in a QR dependency for it.

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return () => {
    h = (h * 1103515245 + 12345) >>> 0;
    return (h / 0xffffffff);
  };
}

const GRID = 21;
const FINDER = 5;

function isFinderZone(x: number, y: number) {
  const zones = [
    [0, 0],
    [GRID - FINDER, 0],
    [0, GRID - FINDER],
  ];
  return zones.some(([zx, zy]) => x >= zx && x < zx + FINDER && y >= zy && y < zy + FINDER);
}

function FinderSquare({ x, y, cell }: { x: number; y: number; cell: number }) {
  return (
    <g>
      <rect x={x * cell} y={y * cell} width={FINDER * cell} height={FINDER * cell} fill="#000" />
      <rect x={(x + 1) * cell} y={(y + 1) * cell} width={(FINDER - 2) * cell} height={(FINDER - 2) * cell} fill="#fff" />
      <rect x={(x + 2) * cell} y={(y + 2) * cell} width={(FINDER - 4) * cell} height={(FINDER - 4) * cell} fill="#000" />
    </g>
  );
}

export default function TicketQR({ seed, size = 220 }: { seed: string; size?: number }) {
  const cell = size / GRID;
  const rand = seededRandom(seed);
  const cells: boolean[][] = Array.from({ length: GRID }, () =>
    Array.from({ length: GRID }, () => rand() > 0.55),
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Ticket QR code">
      <rect width={size} height={size} fill="#fff" />
      {cells.map((row, y) =>
        row.map((filled, x) => {
          if (isFinderZone(x, y)) return null;
          if (!filled) return null;
          return <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="#000" />;
        }),
      )}
      <FinderSquare x={0} y={0} cell={cell} />
      <FinderSquare x={GRID - FINDER} y={0} cell={cell} />
      <FinderSquare x={0} y={GRID - FINDER} cell={cell} />
    </svg>
  );
}
