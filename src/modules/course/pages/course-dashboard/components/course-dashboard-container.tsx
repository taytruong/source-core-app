import CourseContinue from './course-continue';
import CourseListSuggestion from './course-list-suggestion';

export interface CourseDashboardContainerProps {}

function CourseDashboardContainer({}: CourseDashboardContainerProps) {
  return (
    <div className="flex flex-col gap-8">
      <CourseContinue />
      <CourseListSuggestion />
    </div>
  );
}

export default CourseDashboardContainer;
