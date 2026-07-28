import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/shared/constants';

import { fetchCourseStats, fetchDashboardOverview } from '../../actions';

interface QueryFetchItemDashboardProps {
  clerkId?: string;
}

export const useQueryFetchItemDashboard = ({
  clerkId,
}: QueryFetchItemDashboardProps) => {
  return useQuery({
    enabled: !!clerkId,
    queryKey: [QUERY_KEYS.FETCH_DASHBOARD_OVERVIEW, clerkId],
    queryFn: async () => {
      const response = await fetchDashboardOverview({
        clerkId,
      });

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

export const useQueryCourseStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COURSE_STATS],
    queryFn: async () => {
      const response = await fetchCourseStats();

      return (
        response || {
          cardItems: {
            totalCourses: 0,
            totalViews: 0,
            totalRevenue: 0,
            totalPending: 0,
          },
          chartData: [],
        }
      );
    },
    placeholderData: keepPreviousData,
  });
};
