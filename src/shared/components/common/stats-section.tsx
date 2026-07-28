'use client';
import { LucideIcon } from 'lucide-react';

import CardItem from './card-item';
import DonutChart from './donut-chart';

export interface StatCardConfig {
  key: string;
  title: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  formatter?: (value: number) => string | number;
}

export interface ChartItem {
  label: string;
  value: number;
}

export interface StatsOverview {
  cardItems: Record<string, number>;
  chartData: ChartItem[];
}

export interface StatsSectionProps {
  data?: StatsOverview;
  isLoading?: boolean;
  cardConfigs: StatCardConfig[];
  chartTitle?: string;
  chartColors?: Record<string, string>;
}

function StatsSection({
  cardConfigs,
  chartColors,
  chartTitle = 'Overview',
  data,
  isLoading,
}: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="grid grid-cols-2 gap-4 lg:col-span-2">
        {cardConfigs.map((config) => {
          const rawValue = data?.cardItems[config.key] ?? 0;
          const value = config.formatter
            ? config.formatter(rawValue)
            : rawValue;

          return (
            <CardItem
              key={config.key}
              icon={config.icon}
              iconBg={config.iconBg}
              iconColor={config.iconColor}
              isLoading={isLoading}
              title={config.title}
              value={value}
            />
          );
        })}
      </div>

      <DonutChart
        colors={chartColors}
        data={data?.chartData}
        isLoading={isLoading}
        title={chartTitle}
      />
    </div>
  );
}

export default StatsSection;
