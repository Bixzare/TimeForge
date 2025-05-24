export default function NavSkeleton(){
    return(
        <div className="
        fixed top-1 left-1/2 transform -translate-x-1/2 
        z-10 
        flex items-center justify-between 
        bg-background/80
        rounded-full 
        w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
        px-4 py-2
        h-auto
      ">
        {/* Logo skeleton */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="ml-2 h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Settings button skeleton */}
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      </div>
    )
}