export interface CourseItemSkeletonProps {
  type?: 'continue';
}

function CourseItemSkeleton({ type }: CourseItemSkeletonProps) {
  return (
    <>
      {type === 'continue' ? (
        <div className="bg-item flexCenter rounded-2xl border border-gray-200 p-3 shadow-lg">
          <div className="relative block h-32 w-42.5 rounded-lg bg-gray-100" />
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="h-7 w-full animate-pulse bg-gray-100" />
            <div className="flex items-center gap-3">
              <div className="bg-primary ml-auto flex h-10 w-full animate-pulse items-center justify-center rounded-lg px-5 font-bold" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
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
      )}
    </>
  );
}

export default CourseItemSkeleton;
