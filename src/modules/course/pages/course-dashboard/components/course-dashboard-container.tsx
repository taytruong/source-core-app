import { CourseGrid } from '@/src/shared/components/common';

import { CourseItem } from '../../../components/course-item';
import { CourseItemData } from '../../../types';

export interface CourseDashboardContainerProps {
  courseList: CourseItemData[];
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
