import { useMutation } from '@tanstack/react-query';

import { parseData } from '@/src/shared/helper';
import { UpdateCourseParams } from '@/src/shared/types';

import { QUERY_KEYS } from '../../../../shared/constants';
import { getQueryClient } from '../../../../shared/lib/react-query/query-client';
import { updateCourse } from '../../actions';

export function useMutationUpdateCourse() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_COURSE],
    mutationFn: async (data: UpdateCourseParams) => {
      const response = await updateCourse(data);

      return parseData(response);
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.FECTH_COURSES],
          refetchType: 'active',
        });
      }
    },
  });
}
