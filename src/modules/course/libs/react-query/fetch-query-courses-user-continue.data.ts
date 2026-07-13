import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHistory } from '@/src/modules/history/actions';
import { countLessonByCourseId } from '@/src/modules/lesson/actions';
import { QUERY_KEYS } from '@/src/shared/constants';

import { fetchContinueCoursesUser } from '../../actions';

interface QueryFetchCoursesUserContinueProps {
  clerkId: string;
  params: {
    limit?: number;
  };
}

export const useQueryFetchCoursesUserContinue = ({
  clerkId,
  params,
}: QueryFetchCoursesUserContinueProps) => {
  return useQuery({
    enabled: !!clerkId,
    queryKey: [QUERY_KEYS.FETCH_COURSES_USER, clerkId, params],
    queryFn: async () => {
      const response = await fetchContinueCoursesUser({
        clerkId,
        params,
      });

      return response || [];
    },
    placeholderData: keepPreviousData,
  });
};

export const useQueryFetchHistory = ({ courseId }: { courseId: string }) => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_HISTORY, courseId],
    queryFn: async () => {
      const histories = await getHistory({ course: courseId });

      return histories || [];
    },
    placeholderData: keepPreviousData,
  });
};

export const useQueryCountLessonByCourse = ({
  courseId,
}: {
  courseId: string;
}) => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_LESSON_BY_COURSE, courseId],
    queryFn: async () => {
      const lessonCount = await countLessonByCourseId({ course: courseId });

      return lessonCount || 0;
    },
    placeholderData: keepPreviousData,
  });
};
