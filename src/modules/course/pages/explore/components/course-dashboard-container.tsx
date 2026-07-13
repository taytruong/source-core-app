import { CourseItemData } from '../../../types';
import CourseListSuggestion from './course-list-explore';

export interface CourseExploreContainerProps {
  courses: CourseItemData[] | undefined;
  isLoading: boolean;
}

function CourseExploreContainer({
  courses,
  isLoading,
}: CourseExploreContainerProps) {
  return (
    <div>
      <CourseListSuggestion
        courses={courses}
        isLoading={isLoading}
      />
    </div>
  );
}

export default CourseExploreContainer;
