import { CourseGrid } from '@/src/shared/components';

import { CourseItem } from '../../../components/course-item';
import { CourseModelProps } from '../../../models';

export interface CourseDashboardContainerProps {
  courseList: CourseModelProps[];
}

function CourseDashboardContainer({
  courseList,
}: CourseDashboardContainerProps) {
  if (!courseList || courseList.length === 0) return null;

  return (
    <CourseGrid>
      {courseList?.length > 0 &&
        courseList?.map((item) => (
          <CourseItem
            key={item.slug}
            data={item}
          />
        ))}
    </CourseGrid>
  );
}

export default CourseDashboardContainer;
