export default function TabsSkeleton() {
    return(
        <div className="w-full h-full max-w-[80vw] mx-auto py-4 px-4 mt-4 flex flex-col items-center md:flex-row gap-4 bg-gray-400 rounded-xl animate-pulse">
      {/* Left Placeholder Skeleton */}
      <div className="w-full md:h-full md:w-[200px] flex-shrink-0 flex justify-center md:justify-start order-2 md:order-1">
        <div className="w-full h-40 md:h-64 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Center Content Skeleton */}
      <div className="flex-1 min-w-0 flex justify-center items-center order-1 md:order-2">
        <div className="w-full aspect-square max-w-[260px] rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-gray-200 dark:bg-gray-600"></div>
        </div>
      </div>

      {/* Right Side Tabs Skeleton */}
      <div className="w-full md:w-[200px] flex-shrink-0 flex justify-center md:justify-end order-3 rounded-md h-full self-auto">
        <div className="flex flex-row md:flex-col w-full h-fit md:h-full justify-center md:justify-around items-center gap-1">
          {/* Generate tab skeletons */}
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="p-1 h-10 max-h-fit w-full min-w-22 md:min-w-30 rounded-full bg-gray-300 dark:bg-gray-700"
            ></div>
          ))}
        </div>
      </div>
    </div>
    )
}