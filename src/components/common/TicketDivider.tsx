export default function TicketDivider() {
  return (
    <div className="relative -mx-6 my-1 flex w-[calc(100%+3rem)] items-center">
      <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
      <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
      <div className="mx-6 h-0 w-full border-t-2 border-dashed border-black/15" />
    </div>
  );
}