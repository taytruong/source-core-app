'use client';

import { Eye, Power, Ticket, TicketPercent } from 'lucide-react';

import { StatsSection } from '@/src/shared/components/common';
import { couponStatusColors } from '@/src/shared/constants';
import { StatCardConfig } from '@/src/shared/types';

import { useQueryCouponStats } from '../../../lib/react-query';

const couponCardConfigs: StatCardConfig[] = [
  {
    key: 'totalCoupons',
    title: 'Total Coupons',
    icon: Ticket,
    iconBg: '#E0E7FF',
    iconColor: '#4F46E5',
    subtext: 'All time',
  },
  {
    key: 'totalUsed',
    title: 'Total Redemptions',
    icon: TicketPercent,
    iconBg: '#FFEDD5',
    iconColor: '#EA580C',
    formatter: (v) => `${v.toLocaleString('us-US')}`,
    subtext: 'Times used',
  },
  {
    key: 'usedZero',
    title: 'Unused Coupons',
    icon: Eye,
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    subtext: 'Never redeemed',
  },
  {
    key: 'inactiveCoupons',
    title: 'Inactive Coupons',
    icon: Power,
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    subtext: (value) => (value > 0 ? 'Currently disabled' : 'All active'),
  },
];

export interface CouponStatsSectionProps {}

function CouponStatsSection(_props: CouponStatsSectionProps) {
  const { data, isLoading } = useQueryCouponStats();

  const statsData = data && {
    cardItems: data.cardItems,
    chartData: data.chartData.map((item) => ({
      label: item.statusLabel,
      value: item.count,
    })),
  };

  return (
    <StatsSection
      cardConfigs={couponCardConfigs}
      chartColors={couponStatusColors}
      chartTitle="Coupons by Status"
      data={statsData}
      isLoading={isLoading}
    />
  );
}

export default CouponStatsSection;
