import { CourseItemData } from '../../../types';
import CourseListSuggestion from './course-list-explore';

export interface CourseExploreContainerProps {
  courses: CourseItemData[] | undefined;
  isLoading: boolean;
  total?: number;
}

function CourseExploreContainer({
  courses,
  isLoading,
  total,
}: CourseExploreContainerProps) {
  return (
    <div>
      <CourseListSuggestion
        courses={courses}
        isLoading={isLoading}
        total={total}
      />
    </div>
  );
}

export default CourseExploreContainer;
