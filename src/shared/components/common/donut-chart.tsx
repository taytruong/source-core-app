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
const RADIAN = Math.PI / 180;

// Custom label render
const renderCustomizedLabel = ({
  cx,
  cy,
  innerRadius,
  midAngle,
  outerRadius,
  percent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Hide label if the percentage is less than 5%
  if (percent < 0.05) return null;

  return (
    <text
      dominantBaseline="central"
      fill="white"
      fontSize={12}
      fontWeight={600}
      textAnchor="middle"
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export interface DonutChartProps {
  title: string;
  data?: ChartItem[];
  colors?: Record<string, string>;
  isLoading?: boolean;
}

function DonutChart({ colors, data, isLoading, title }: DonutChartProps) {
  if (isLoading) {
    return (
      <div className="bg-item flex h-70 items-center justify-center rounded-lg p-4 shadow-sm">
        <div className="size-40 animate-pulse rounded-full bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="bg-item h-full rounded-lg p-2 shadow-sm">
      <h3 className="text-sm font-medium">{title}</h3>
      <ResponsiveContainer
        height={260}
        width="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={0}
            label={renderCustomizedLabel}
            labelLine={false}
            nameKey="label"
            outerRadius={110}
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
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonutChart;
