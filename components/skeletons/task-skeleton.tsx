export default function TaskSkeleton() {
    return(
        <div className="flex w-full flex-col justify-center items-center">
                {/* Skeleton for title */}
                <div className="text-3xl h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                
                {/* Skeleton for textarea container */}
                <div className="p-1 min-w-[90vw] md:min-w-[50vw] max-w-[90vw] lg:max-w-[60vw]
                border-gray-300 dark:border-gray-700 border justify-center h-full rounded-xl
                bg-gray-200 dark:bg-gray-800 animate-pulse">
                    
                    {/* Skeleton for textarea */}
                    <div className="flex flex-col gap-2 p-4 min-h-64">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                    </div>
                </div>
            </div>
    )
}