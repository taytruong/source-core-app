export interface CourseLessonOutlineProps {
  completePercent: number;
  children?: React.ReactNode;
}

function CourseLessonOutline({
  children,
  completePercent,
}: CourseLessonOutlineProps) {
  return (
    <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="overflow-hidde relative mb-2 h-3 w-full rounded-full border border-slate-200 bg-white">
        <div
          className="from-primary h-full w-0 rounded-full bg-linear-to-r to-yellow-400 transition-all duration-500"
          style={{
            width: `${completePercent}%`,
          }}
        />
        <span
          className={`absolute inset-0 z-10 flex items-center justify-center text-xs font-semibold ${
            completePercent > 50 ? 'text-white' : 'text-black'
          }`}
        >
          {completePercent}%
        </span>
      </div>
      {children}
    </div>
  );
}

export default CourseLessonOutline;
