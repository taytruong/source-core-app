'use client';

import { CourseGrid, Heading } from '@/src/shared/components/common';
import { useUserContext } from '@/src/shared/contexts';
import { handleGetStorageLesson } from '@/src/shared/helper';

import { CourseItemContinue } from '../../../components/course-item';
import { useQueryFetchCoursesUserContinue } from '../../../libs/react-query';

export interface CourseContinueProps {}

function CourseContinue(_props: CourseContinueProps) {
  const { userInfo } = useUserContext();

  const { data, isLoading } = useQueryFetchCoursesUserContinue({
    clerkId: userInfo?.clerkId || '',
  });

  const courseList = data || [];

  if (!isLoading && courseList.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      <Heading className="lg:text-xl">Tiếp tục học</Heading>
      <CourseGrid
        isLoading={isLoading}
        type="continue"
      >
        {courseList?.length > 0 &&
          courseList?.map((item) => {
            const firstLessonUrl = item.lectures[0]?.lessons[0]?._id.toString();

            const url = handleGetStorageLesson({
              courseSlug: item.slug,
              lessonId: firstLessonUrl,
            });

            return (
              <CourseItemContinue
                key={item.slug}
                cta="Tiếp tục học"
                data={item}
                url={url}
              />
            );
          })}
      </CourseGrid>
    </div>
  );
}

export default CourseContinue;
