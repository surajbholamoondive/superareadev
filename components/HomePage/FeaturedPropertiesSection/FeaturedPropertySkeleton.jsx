// ✅ Premium Featured Property Card Skeleton with Shimmer
const FeaturedPropertySkeleton = () => (
  <div className="w-full max-w-[344px] xs:max-w-[400px] mx-auto">
    <div className="relative overflow-hidden rounded-t-[1.5rem] border-2 border-gray-200 border-b-0">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />
      
      {/* Image skeleton */}
      <div className="w-full h-[180px] xs:h-[200px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200" />
    </div>

    <div className="py-3 rounded-b-3xl border-2 border-gray-200 border-t-0 bg-white relative overflow-hidden">
      {/* Shimmer overlay for content */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
      
      <div className="relative space-y-3">
        {/* Title and Price Row */}
        <div className="flex items-center justify-between px-3 xs:px-4 h-[60px]">
          <div className="h-5 w-[65%] xs:w-[70%] rounded-lg bg-gray-200" />
          <div className="h-5 w-[80px] xs:w-[100px] rounded-lg bg-gray-200" />
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-1 xs:gap-2 px-3 xs:px-4">
          <div className="h-3 w-3 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="h-4 w-[60%] rounded-lg bg-gray-200" />
        </div>

        {/* Property Details Row (Beds, Baths, Size) */}
        <div className="flex gap-1 mt-3 justify-between px-3 xs:px-[14px]">
          <div className="flex items-center gap-1 flex-1">
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-3 w-12 rounded-lg bg-gray-200" />
          </div>
          <div className="flex items-center gap-1 flex-1 justify-center">
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-3 w-12 rounded-lg bg-gray-200" />
          </div>
          <div className="flex items-center gap-1 flex-1 justify-end">
            <div className="h-3 w-3 rounded-full bg-gray-200" />
            <div className="h-3 w-16 rounded-lg bg-gray-200" />
          </div>
        </div>

        {/* Project Details Row (for projects) */}
        <div className="flex flex-col mt-4 px-3 xs:px-4 gap-2 xs:gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 xs:gap-2">
              <div className="h-3 w-20 rounded-lg bg-gray-200" />
              <div className="h-3 w-16 rounded-lg bg-gray-200" />
            </div>
            <div className="flex items-center gap-1 xs:gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-200" />
              <div className="h-3 w-12 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center w-[85%] xs:w-[80%] h-7 xs:h-8 mt-16 md:mt-8 lg:mt-8 rounded-3xl mx-auto">
          <div className="w-full h-full rounded-3xl bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
)

// ✅ Premium Featured Properties Section Skeleton
const FeaturedPropertiesSkeleton = () => (
  <div className="w-full px-4 py-6">
    {/* Section Title Skeleton */}
    <div className="flex justify-center items-center gap-2 mb-6">
      <div className="h-7 w-32 rounded-lg bg-gray-200 animate-pulse" />
      <div className="h-7 w-28 rounded-lg bg-gray-200 animate-pulse" />
    </div>

    {/* Grid of Property Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <FeaturedPropertySkeleton key={i} />
      ))}
    </div>
  </div>
)

// ✅ Alternative: Luxury Gradient Version with Enhanced Shimmer
const LuxuryFeaturedPropertySkeleton = () => (
  <div className="w-full max-w-[344px] xs:max-w-[400px] mx-auto group">
    <div className="relative overflow-hidden rounded-t-[1.5rem] border-2 border-primary/20 border-b-0">
      {/* Enhanced shimmer with gradient */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-blue-100/50 to-transparent z-10" />
      
      {/* Premium image skeleton */}
      <div className="w-full h-[180px] xs:h-[200px] bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100" />
    </div>

    <div className="py-3 rounded-b-3xl border-2 border-primary/20 border-t-0 bg-gradient-to-b from-white to-gray-50/30 relative overflow-hidden shadow-sm">
      {/* Premium shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-blue-50/40 to-transparent z-10" />
      
      <div className="relative space-y-3">
        {/* Title and Price Row */}
        <div className="flex items-center justify-between px-3 xs:px-4 h-[60px]">
          <div className="h-5 w-[65%] xs:w-[70%] rounded-lg bg-gradient-to-r from-slate-200 to-slate-300/50" />
          <div className="h-5 w-[80px] xs:w-[100px] rounded-lg bg-gradient-to-r from-blue-200/50 to-blue-300/50" />
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-1 xs:gap-2 px-3 xs:px-4">
          <div className="h-3 w-3 rounded-full bg-slate-300/70 flex-shrink-0" />
          <div className="h-4 w-[60%] rounded-lg bg-slate-200/70" />
        </div>

        {/* Property Details Row */}
        <div className="flex gap-1 mt-3 justify-between px-3 xs:px-[14px]">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-1 flex-1 justify-center">
              <div className="h-3 w-3 rounded-full bg-slate-300/60" />
              <div className="h-3 w-12 rounded-lg bg-slate-200/60" />
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className="flex flex-col mt-4 px-3 xs:px-4 gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-20 rounded-lg bg-slate-200/70" />
              <div className="h-3 w-16 rounded-lg bg-slate-200/70" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-300/60" />
              <div className="h-3 w-12 rounded-lg bg-slate-200/60" />
            </div>
          </div>
        </div>

        {/* Premium Button Skeleton */}
        <div className="flex justify-center w-[85%] xs:w-[80%] h-7 xs:h-8 mt-16 md:mt-8 lg:mt-8 rounded-3xl mx-auto">
          <div className="w-full h-full rounded-3xl bg-gradient-to-r from-slate-200 to-slate-300/50 shadow-sm" />
        </div>
      </div>
    </div>
  </div>
)

// ✅ Export the main skeleton component
export { FeaturedPropertiesSkeleton, FeaturedPropertySkeleton, LuxuryFeaturedPropertySkeleton }
