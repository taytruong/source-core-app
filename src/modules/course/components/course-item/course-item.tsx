import { ChefHatIcon, FileTextIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { IconEye } from '@/src/shared/components/icons';
import { courseLevelColor, courseLevelTitle } from '@/src/shared/constants';
import { formatViews } from '@/src/shared/helper';
import { cn } from '@/src/shared/utils';

import { CourseItemData } from '../../types';
import CourseItemDuration from './course-item-duration';

interface CourseItemProps {
  data: CourseItemData;
  cta?: string;
  url?: string;
}

const CourseItem = ({
  cta = 'Detail view',
  data,
  url = '',
}: CourseItemProps) => {
  const courseUrl = url || `/course/${data.slug}`;
  const courseInfo = [
    {
      title: formatViews(data?.views),
      icon: <IconEye className="size-4" />,
      text: 'Views',
    },
    {
      title: data?.lectures.length,
      icon: <FileTextIcon className="size-4" />,
      text: 'Lectures',
    },
  ];

  return (
    <div className="bg-item flex flex-col rounded-2xl border border-gray-200 p-3 shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
      <Link
        className="relative block h-52"
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
        <span className="absolute right-2 bottom-2 rounded-md bg-white px-2 py-1 text-sm font-bold text-black shadow-sm">
          $ {data?.price?.toLocaleString('en-EN')}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 pt-4">
        <div className="flex items-center gap-2">
          <ChefHatIcon
            className={cn(
              'size-5 rounded-sm p-0.5 text-white',
              courseLevelColor[data?.level],
            )}
          />
          <span className="font-medium">{courseLevelTitle[data?.level]}</span>
        </div>
        <h3 className="mb-3 text-lg font-semibold">{data?.title}</h3>
        <div className="mt-auto">
          <div className="mb-5 flex items-center gap-3 text-xs text-gray-500">
            {courseInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                {item.icon}
                <div className="flex items-center gap-1">
                  <span>{item.title}</span>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
            <CourseItemDuration slug={data.slug} />
          </div>

          <Link
            className="bg-primary button-primary flex h-12 w-full items-center justify-center rounded-lg font-bold text-white"
            href={courseUrl}
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
