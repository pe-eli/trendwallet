export function SkeletonLoader({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="h-10 w-10 rounded-full shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 rounded-lg shimmer w-3/4" />
            <div className="h-3 rounded-lg shimmer w-1/2" />
          </div>
          <div className="h-4 w-20 rounded-lg shimmer" />
        </div>
      ))}
    </div>
  );
}
