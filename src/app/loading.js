export default function Loading() {
  return (
    <div className="grid gap-6">
      <div className="h-48 animate-pulse rounded-[2.5rem] bg-white/80" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-[2rem] bg-white/80"
          />
        ))}
      </div>
    </div>
  );
}
