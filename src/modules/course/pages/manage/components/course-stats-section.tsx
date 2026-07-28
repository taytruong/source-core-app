'use client';

import { BookOpen, Clock, DollarSign, Eye } from 'lucide-react';

import { StatsSection } from '@/src/shared/components/common';
import { courseStatusColors } from '@/src/shared/constants';
import { formatViews } from '@/src/shared/helper';
import { StatCardConfig } from '@/src/shared/types';

import { useQueryCourseStats } from '../../../libs/react-query';

const courseCardConfigs: StatCardConfig[] = [
  {
    key: 'totalCourses',
    title: 'Total Courses',
    icon: BookOpen,
    iconBg: '#E0E7FF',
    iconColor: '#4F46E5',
    subtext: 'Published & pending',
  },
  {
    key: 'totalViews',
    title: 'Total Views',
    icon: Eye,
    iconBg: '#FCE7F3',
    iconColor: '#DB2777',
    formatter: formatViews,
    subtext: 'Across all courses',
  },
  {
    key: 'totalRevenue',
    title: 'Total Revenue',
    icon: DollarSign,
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    formatter: (v) => `$ ${v.toLocaleString('us-US')}`,
    subtext: 'From approved courses',
  },
  {
    key: 'totalPending',
    title: 'Pending Review',
    icon: Clock,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    subtext: (value) => (value > 0 ? 'Needs your attention' : 'All caught up'),
  },
];

export interface CourseStatsSectionProps {}

function CourseStatsSection(_props: CourseStatsSectionProps) {
  const { data, isLoading } = useQueryCourseStats();

  const statsData = data && {
    cardItems: data.cardItems,
    chartData: data.chartData.map((item) => ({
      label: item.status,
      value: item.count,
    })),
  };

  return (
    <StatsSection
      cardConfigs={courseCardConfigs}
      chartColors={courseStatusColors}
      chartTitle="Courses by Status"
      data={statsData}
      isLoading={isLoading}
    />
  );
}

export default CourseStatsSection;
