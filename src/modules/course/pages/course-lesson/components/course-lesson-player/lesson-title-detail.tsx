import { FileTextIcon } from 'lucide-react';
import Link from 'next/link';

import { CourseItemDuration } from '@/src/modules/course/components/course-item';
import { CourseItemData } from '@/src/modules/course/types';
import { Heading } from '@/src/shared/components/common';
import { IconArrowLeft, IconPlay } from '@/src/shared/components/icons';
import { courseLevelTitle } from '@/src/shared/constants';
import { LessonModelProps } from '@/src/shared/types';

export interface LessonTitleDetailProps {
  foundCourse: CourseItemData;
  lessonList: LessonModelProps[] | undefined;
}

function LessonTitleDetail({
  foundCourse,
  lessonList,
}: LessonTitleDetailProps) {
  const lessonInfo = [
    {
      title: lessonList?.length,
      icon: <IconPlay className="size-4" />,
      text: 'Lessons',
    },
    {
      title: foundCourse?.lectures.length,
      icon: <FileTextIcon className="size-4" />,
      text: 'Lectures',
    },
  ];

  return (
    <>
      <div className="mb-2 flex items-center gap-3">
        <Link
          className="flex items-center rounded-md border border-gray-400 p-1"
          href={'/study'}
        >
          <IconArrowLeft />
        </Link>
        <Heading className="font-semibold lg:text-3xl">
          {foundCourse.title}
        </Heading>
        <div className="rounded-xl border p-1 px-2 text-xs">
          {courseLevelTitle[foundCourse?.level]}
        </div>
      </div>
      <div className="mb-5 flex items-center gap-3 pl-11.25 text-sm font-medium">
        {lessonInfo.map((item, index) => (
          <div
            key={index}
            className="text-primary flex items-center gap-2"
          >
            {item.icon}
            <div className="flex items-center gap-1 text-black">
              <span>{item.title}</span>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
        <CourseItemDuration
          classIcon="text-primary"
          slug={foundCourse.slug}
        />
      </div>
    </>
  );
}

export default LessonTitleDetail;
