import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/shared/constants';

import { fetchContinueCoursesUser } from '../../actions';

interface QueryFetchCoursesUserContinueProps {
  clerkId: string;
}

export const useQueryFetchCoursesUserContinue = ({
  clerkId,
}: QueryFetchCoursesUserContinueProps) => {
  return useQuery({
    enabled: !!clerkId,
    queryKey: [QUERY_KEYS.FETCH_COURSES_USER, clerkId],
    queryFn: async () => {
      const response = await fetchContinueCoursesUser({ clerkId });

      return response || [];
    },
    placeholderData: keepPreviousData,
  });
};
