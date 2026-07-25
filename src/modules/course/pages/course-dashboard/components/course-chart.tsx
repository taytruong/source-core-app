import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Heading } from '@/src/shared/components/common';

interface ChartData {
  month: string;
  hours: number;
}

export interface CourseChartProps {
  data: ChartData[];
  isLoading: boolean;
}

function CourseChart({
  data,
  isLoading,
}: CourseChartProps & { isLoading: boolean }) {
  if (isLoading) {
    return (
      <>
        <Heading className="mb-5 lg:text-xl">Hours Spent</Heading>
        <div className="bg-item rounded-lg p-6 shadow-sm">
          <div className="h-80 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </>
    );
  }

  return (
    <>
      <Heading className="mb-5 lg:text-xl">Hours Spent</Heading>
      <div className="bg-item rounded-lg p-6 shadow-sm">
        <ResponsiveContainer
          height={320}
          width="100%"
        >
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#e0e0e0"
              strokeDasharray="3 3"
              strokeWidth={1.5}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontWeight: 600 }}
              tickLine={false}
              tickMargin={7}
            />
            <YAxis
              tick={{ fontWeight: 600 }}
              tickFormatter={(v) => `${v} Hr`}
              tickLine={false}
              tickMargin={5}
            />
            <Tooltip
              cursor={false}
              formatter={(value) => `${value} Hr`}
              contentStyle={{
                borderRadius: 8,
                color: '#1c1c1c',
                background: '#fff',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                fontWeight: 600,
              }}
            />
            <Bar
              dataKey="hours"
              fill="#D35152"
              name="Study"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default CourseChart;
