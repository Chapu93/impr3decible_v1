const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark animate-pulse">
        <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    )
  }

  return null
}

export default SkeletonLoader
