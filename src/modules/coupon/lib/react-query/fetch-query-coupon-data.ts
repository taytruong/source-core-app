import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/src/shared/constants';

import { fetchCouponStats } from '../../actions';

export const useQueryCouponStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COUPON_STATS],
    queryFn: async () => {
      const response = await fetchCouponStats();

      return (
        response || {
          cardItems: {
            totalCoupons: 0,
            totalUsed: 0,
            usedZero: 0,
            inactiveCoupons: 0,
          },
          chartData: [],
        }
      );
    },
    placeholderData: keepPreviousData,
  });
};
