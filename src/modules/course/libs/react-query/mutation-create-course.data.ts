import { useMutation } from '@tanstack/react-query';

import { createCourse } from '@/src/modules/course/actions';
import { parseData } from '@/src/shared/helper';
import { CreateCourseParams } from '@/src/shared/types';

import { QUERY_KEYS } from '../../../../shared/constants';
import { getQueryClient } from '../../../../shared/lib/react-query/query-client';

export function useMutationCreateCourse() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_COURSE],
    mutationFn: async (data: CreateCourseParams) => {
      const response = await createCourse(data);

      return parseData(response);
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FECTH_COURSES],
        });
      }
    },
  });
}
