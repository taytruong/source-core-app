'use client';

import { ChefHatIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { courseLevelColor, courseLevelTitle } from '@/src/shared/constants';
import { cn } from '@/src/shared/utils';

import {
  useQueryCountLessonByCourse,
  useQueryFetchHistory,
} from '../../libs/react-query';
import { CourseItemData } from '../../types';

interface CourseItemContinueProps {
  data: CourseItemData;
  cta?: string;
  url?: string;
}

const CourseItemContinue = ({
  cta = '',
  data,
  url = '',
}: CourseItemContinueProps) => {
  const courseId = data._id.toString();

  const { data: histories } = useQueryFetchHistory({ courseId });
  const { data: lessonCount } = useQueryCountLessonByCourse({ courseId });

  const completePercent = Math.floor(
    ((histories?.length || 0) / (lessonCount || 1)) * 100,
  );

  const courseUrl = url || `/course/${data.slug}`;

  return (
    <div className="bg-item flexCenter rounded-2xl border border-gray-200 px-3 shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
      <Link
        className="relative block h-32"
        href={courseUrl}
      >
        <Image
          priority
          alt={data.title}
          className="h-full w-full rounded-lg object-cover"
          height={200}
          sizes="@media (min-width:640px) 300px, 100vw"
          src={data.image}
          width={300}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-7 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ChefHatIcon
              className={cn(
                'size-5 rounded-sm p-0.5 text-white',
                courseLevelColor[data?.level],
              )}
            />
            <span className="font-medium">{courseLevelTitle[data?.level]}</span>
          </div>
          <h3 className="text-xl font-semibold">{data?.title}</h3>
        </div>

        <div className="flex items-end gap-6">
          <div className="flex w-full flex-col gap-2">
            <span className="text-base font-medium">
              Progess: <strong>{completePercent}%</strong>
            </span>
            <div className="relative h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="from-primary h-full w-0 rounded-full bg-linear-to-r to-yellow-400 transition-all duration-500"
                style={{
                  width: `${completePercent}%`,
                }}
              />
            </div>
          </div>
          <Link
            className="bg-primary button-primary ml-auto flex h-10 w-max items-center justify-center rounded-lg px-5 font-bold text-white"
            href={courseUrl}
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItemContinue;
