'use client';

import { BookOpen, Clock3, FileTextIcon, Trophy } from 'lucide-react';

import { useQueryFetchItemDashboard } from '@/src/modules/course/libs/react-query';
import CourseChart from '@/src/modules/course/pages/course-dashboard/components/course-chart';

import { useUserContext } from '../../contexts';
import { CardItem } from '../common';

export interface DashboardProps {}

function Dashboard(_props: DashboardProps) {
  const { userInfo } = useUserContext();
  const { data, isLoading } = useQueryFetchItemDashboard({
    clerkId: userInfo?.clerkId || '',
  });

  const isEmptyCardItems =
    data?.cardItems.totalCourses === 0 &&
    data?.cardItems.totalCompleted === 0 &&
    data?.cardItems.totalPending === 0 &&
    data?.cardItems.totalHours === 0;

  const isEmptyChart = data?.chartData.length === 0;

  if (!isLoading && (isEmptyCardItems || isEmptyChart)) {
    return null;
  }

  const overviewCards = [
    {
      title: 'Courses',
      value: data?.cardItems.totalCourses ?? 0,
      icon: BookOpen,
      iconBg: '#FAF0DC',
      iconColor: '#D6A44E',
    },
    {
      title: 'Pending',
      value: data?.cardItems.totalPending ?? 0,
      icon: FileTextIcon,
      iconBg: '#E8F5E9',
      iconColor: '#43A047',
    },
    {
      title: 'Completed',
      value: data?.cardItems.totalCompleted ?? 0,
      icon: Trophy,
      iconBg: '#FCE4EC',
      iconColor: '#E91E63',
    },
    {
      title: 'Hours',
      value: data?.cardItems.totalHours ?? 0,
      icon: Clock3,
      iconBg: '#E3F2FD',
      iconColor: '#1976D2',
    },
  ];

  return (
    <div className="grid grid-cols-[1fr_260px] gap-6">
      <div>
        <CourseChart
          data={data?.chartData || []}
          isLoading={isLoading}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {overviewCards.map((item) => (
          <CardItem
            key={item.title}
            {...item}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
