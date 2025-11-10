// SearchResultCardSkeleton.jsx
const SearchResultCardSkeleton = ({ isProject = false }) => {
  return (
    <section className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 relative overflow-hidden max-lg:flex-col mb-5">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />

      {/* Image Carousel Skeleton */}
      <div className="w-[230px] h-[245px] max-lg:w-full rounded-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col gap-3 relative">
        {/* Badge and Icons Row */}
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded-lg bg-gray-200" />
            <div className="h-4 w-1 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded-lg bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200" />
            <div className="h-6 w-6 rounded-full bg-gray-200" />
            <div className="h-6 w-6 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Title and Price Row */}
        <div className="flex justify-between items-center gap-2">
          <div className="h-6 w-[65%] rounded-lg bg-gradient-to-r from-gray-200 to-gray-300" />
          <div className="h-6 w-24 rounded-lg bg-gradient-to-r from-[var(--secondary-color)] to-[color-mix(in srgb, var(--secondary-color) 60%, transparent)]" />
        </div>

        {/* Location Row */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center flex-1">
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-4 w-[60%] rounded-lg bg-gray-200" />
          </div>
          {!isProject && (
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          )}
        </div>

        {/* Property Details (Beds, Baths, Size) */}
        {!isProject ? (
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3 w-16 rounded-lg bg-gray-200" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3 w-16 rounded-lg bg-gray-200" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-4 w-28 rounded-lg bg-gray-200" />
            <div className="h-4 w-1 bg-gray-200" />
            <div className="h-4 w-24 rounded-lg bg-gray-200" />
            <div className="h-4 w-1 bg-gray-200" />
            <div className="h-4 w-20 rounded-lg bg-gray-200" />
          </div>
        )}

        {/* Description Lines */}
        <div className="space-y-2 mt-2">
          <div className="h-3 w-full rounded-lg bg-gray-200" />
          <div className="h-3 w-[85%] rounded-lg bg-gray-200" />
        </div>

        {/* Project Details Row (for projects only) */}
        {isProject && (
          <div className="flex gap-2 mt-2">
            <div className="h-8 w-32 rounded-lg bg-gray-200" />
            <div className="h-8 w-24 rounded-lg bg-gray-200" />
            <div className="h-8 w-28 rounded-lg bg-gray-200" />
          </div>
        )}

        {/* Footer - User Info and Contact Button */}
        <div className={`flex ${isProject ? 'justify-end' : 'justify-between'} items-center mt-auto`}>
          {!isProject && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="space-y-1">
                <div className="h-4 w-24 rounded-lg bg-gray-200" />
                <div className="h-3 w-16 rounded-lg bg-gray-200" />
              </div>
            </div>
          )}
          <div className="h-10 w-28 rounded-full bg-gradient-to-r from-gray-200 to-gray-300" />
        </div>
      </div>
    </section>
  )
}

// ✅ Luxury Gradient Version
const LuxurySearchResultCardSkeleton = ({ isProject = false }) => {
  return (
    <section className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-50/30 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden max-lg:flex-col hover:shadow-md transition-shadow">
      {/* Premium shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-blue-50/50 to-transparent z-10" />

      {/* Image Carousel Skeleton with gradient */}
      <div className="w-[230px] h-[245px] max-lg:w-full rounded-lg bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100 flex-shrink-0 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-blue-100/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col gap-3 relative">
        {/* Badge and Icons Row */}
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <div className="h-4 w-4 rounded-full bg-slate-200/70" />
            <div className="h-4 w-20 rounded-lg bg-gradient-to-r from-slate-200 to-slate-300/50" />
            <div className="h-4 w-1 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded-lg bg-slate-200/70" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-blue-200/50" />
            <div className="h-6 w-6 rounded-full bg-slate-200/70" />
            <div className="h-6 w-6 rounded-full bg-slate-200/70" />
          </div>
        </div>

        {/* Title and Price Row */}
        <div className="flex justify-between items-center gap-2">
          <div className="h-6 w-[65%] rounded-lg bg-gradient-to-r from-slate-200 to-slate-300/60" />
       <div className="h-6 w-24 rounded-lg bg-gradient-to-r from-[var(--secondary-color)] to-[color-mix(in srgb, var(--secondary-color) 60%, transparent)]" />

        </div>

        {/* Location Row */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center flex-1">
            <div className="h-3 w-3 rounded-full bg-slate-300/60" />
            <div className="h-4 w-[60%] rounded-lg bg-slate-200/70" />
          </div>
          {!isProject && (
            <div className="h-6 w-16 rounded-full bg-blue-200/50" />
          )}
        </div>

        {/* Property Details */}
        {!isProject ? (
          <div className="flex gap-3 items-center flex-wrap">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-slate-300/60" />
                <div className="h-3 w-16 rounded-lg bg-slate-200/70" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-4 w-28 rounded-lg bg-slate-200/70" />
            <div className="h-4 w-1 bg-slate-200/50" />
            <div className="h-4 w-24 rounded-lg bg-slate-200/70" />
            <div className="h-4 w-1 bg-slate-200/50" />
            <div className="h-4 w-20 rounded-lg bg-slate-200/70" />
          </div>
        )}

        {/* Description Lines */}
        <div className="space-y-2 mt-2">
          <div className="h-3 w-full rounded-lg bg-slate-200/60" />
          <div className="h-3 w-[85%] rounded-lg bg-slate-200/60" />
        </div>

        {/* Project Details Row */}
        {isProject && (
          <div className="flex gap-2 mt-2">
            <div className="h-8 w-32 rounded-lg bg-blue-100/50" />
            <div className="h-8 w-24 rounded-lg bg-blue-100/50" />
            <div className="h-8 w-28 rounded-lg bg-blue-100/50" />
          </div>
        )}

        {/* Footer */}
        <div className={`flex ${isProject ? 'justify-end' : 'justify-between'} items-center mt-auto pt-2`}>
          {!isProject && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300/60" />
              <div className="space-y-1.5">
                <div className="h-4 w-24 rounded-lg bg-slate-200/70" />
                <div className="h-3 w-16 rounded-lg bg-slate-200/60" />
              </div>
            </div>
          )}
          <div className="h-10 w-28 rounded-full bg-gradient-to-r from-slate-200 to-slate-300/70 shadow-sm" />
        </div>
      </div>
    </section>
  )
}

// ✅ Grid of multiple skeletons
const SearchResultsSkeleton = ({ count = 6, isProject = false }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <LuxurySearchResultCardSkeleton key={index} isProject={isProject} />
      ))}
    </div>
  )
}

export { 
  SearchResultCardSkeleton, 
  LuxurySearchResultCardSkeleton, 
  SearchResultsSkeleton 
}
