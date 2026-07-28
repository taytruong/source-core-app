'use client';

import { Clock, DollarSign, ShoppingCart, User } from 'lucide-react';

import { StatsSection } from '@/src/shared/components/common';
import { orderStatusColors } from '@/src/shared/constants';
import { StatCardConfig } from '@/src/shared/types';

import { useQueryOrderStats } from '../../../lib/react-query';

const orderCardConfigs: StatCardConfig[] = [
  {
    key: 'totalOrders',
    title: 'Total Orders',
    icon: ShoppingCart,
    iconBg: '#E0E7FF',
    iconColor: '#4F46E5',
    subtext: 'All time',
  },

  {
    key: 'totalUsers',
    title: 'Total Users',
    icon: User,
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    formatter: (v) => `${v.toLocaleString('us-US')}`,
    subtext: 'Registered accounts',
  },
  {
    key: 'totalRevenue',
    title: 'Total Revenue',
    icon: DollarSign,
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    formatter: (v) => `$ ${v.toLocaleString('us-US')}`,
    subtext: 'From completed orders',
  },
  {
    key: 'totalPending',
    title: 'Pending Orders',
    icon: Clock,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    subtext: (value) => (value > 0 ? 'Needs your attention' : 'All caught up'),
  },
];

export interface OrderStatsSectionProps {}

function OrderStatsSection(_props: OrderStatsSectionProps) {
  const { data, isLoading } = useQueryOrderStats();

  const statsData = data && {
    cardItems: data.cardItems,
    chartData: data.chartData.map((item) => ({
      label: item.status,
      value: item.count,
    })),
  };

  return (
    <StatsSection
      cardConfigs={orderCardConfigs}
      chartColors={orderStatusColors}
      chartTitle="Orders by Status"
      data={statsData}
      isLoading={isLoading}
    />
  );
}

export default OrderStatsSection;
