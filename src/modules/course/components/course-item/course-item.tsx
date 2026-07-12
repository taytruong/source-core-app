import Image from 'next/image';
import Link from 'next/link';

import { IconEye, IconStar } from '@/src/shared/components/icons';
import { formatViews } from '@/src/shared/helper';

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
      icon: <IconEye className="size-5" />,
    },
    {
      title: 5,
      icon: <IconStar className="size-5" />,
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
      </Link>
      <div className="mt-2 flex flex-1 flex-col pt-4">
        <h3 className="mb-3 text-lg font-medium">{data?.title}</h3>
        <div className="mt-auto">
          <div className="mb-0 grid grid-cols-2 text-xs text-gray-500 xl:mb-5 xl:flex xl:items-center xl:gap-3">
            {courseInfo.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
            <CourseItemDuration slug={data.slug} />

            <span className="text-primary ml-auto text-base font-bold">
              {data?.price?.toLocaleString('en-EN')}
            </span>
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
