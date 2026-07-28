import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/shared/constants';

import { fetchOrderStats } from '../../actions';

export const useQueryOrderStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER_STATS],
    queryFn: async () => {
      const response = await fetchOrderStats();

      return (
        response || {
          cardItems: {
            totalOrders: 0,
            totalRevenue: 0,
            totalUsers: 0,
            totalPending: 0,
          },
          chartData: [],
        }
      );
    },
    placeholderData: keepPreviousData,
  });
};
