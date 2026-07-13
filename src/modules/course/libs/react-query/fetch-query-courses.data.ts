import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/shared/constants';
import { FilterQueryParams } from '@/src/shared/types';

import { fetchCourse } from '../../actions';

interface QueryFetchCoursesProps extends FilterQueryParams {}

export const useQueryFetchCourses = (props: QueryFetchCoursesProps) => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FECTH_COURSES, props],
    queryFn: async () => {
      const response = await fetchCourse(props);

      return response || [];
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
