import { useEffect, useState } from 'react';

function format(msLeft: number) {
  const total = Math.max(0, Math.floor(msLeft / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function useCountdown(targetMs?: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!targetMs) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (!targetMs) return { label: '', expired: true };

  const msLeft = targetMs - now;
  return { label: format(msLeft), expired: msLeft <= 0 };
}
