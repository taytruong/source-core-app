export interface CourseItemSkeletonProps {}

function CourseItemSkeleton(_props: CourseItemSkeletonProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
      <div className="h-48 animate-pulse bg-gray-100" />
      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-3 h-14 w-full animate-pulse bg-gray-100" />

        <div className="mt-auto">
          <div className="mb-0 grid h-6 grid-cols-2 text-xs text-gray-500 xl:mb-5 xl:flex xl:items-center xl:gap-3">
            <div className="h-2 w-full animate-pulse bg-gray-100" />
          </div>

          <div className="bg-primary h-12 w-full animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default CourseItemSkeleton;
