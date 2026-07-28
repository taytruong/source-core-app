'use client';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { ChartItem } from './stats-section';

const FALLBACK_COLOR = '#94A3B8';

export interface DonutChartProps {
  title: string;
  data?: ChartItem[];
  colors?: Record<string, string>;
  isLoading?: boolean;
}

function DonutChart({ colors, data, isLoading, title }: DonutChartProps) {
  if (isLoading) {
    return (
      <div className="bg-item flex h-68 items-center justify-center rounded-lg p-4 shadow-sm">
        <div className="size-38 animate-pulse rounded-full bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="bg-item h-full rounded-lg p-2 shadow-sm">
      <h3 className="text-sm font-medium">{title}</h3>
      <ResponsiveContainer
        height={220}
        width="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={65}
            nameKey="label"
            outerRadius={95}
            paddingAngle={3}
            stroke="none"
          >
            {data?.map((entry) => (
              <Cell
                key={entry.label}
                fill={colors?.[entry.label] ?? FALLBACK_COLOR}
              />
            ))}
          </Pie>
          <Legend
            align="center"
            iconSize={10}
            iconType="square"
            verticalAlign="bottom"
            wrapperStyle={{
              fontSize: 12,
              fontWeight: 500,
              paddingTop: 10,
            }}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              borderRadius: 8,
              background: '#fff',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
              fontWeight: 600,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonutChart;
