import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/shared/constants';

import { fetchDashboardOverview } from '../../actions';

export const useQueryFetchItemDashboard = () => {
  return useQuery({
    enabled: true,
    queryKey: [QUERY_KEYS.FETCH_DASHBOARD_OVERVIEW],
    queryFn: async () => {
      const response = await fetchDashboardOverview();

      return (
        response ?? {
          cardItems: {
            totalCourses: 0,
            totalCompleted: 0,
            totalPending: 0,
            totalHours: 0,
          },
          chartData: [],
        }
      );
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
