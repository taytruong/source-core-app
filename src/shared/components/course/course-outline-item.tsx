'use client';

import Link from 'next/link';

import { createHistory } from '@/src/modules/history/actions';
import { Checkbox } from '@/src/shared/components/ui/checkbox';
import { HistoryItem, LessonItemData } from '@/src/shared/types';

import { cn } from '../../utils';
import { IconPlay } from '../icons';

interface CourseOutlineItemProps {
  lesson: LessonItemData;
  histories?: HistoryItem[];
  course: string;
  lessonId: string;
  type?: string;
  isLastLine?: unknown;
}
const CourseOutlineItem = ({
  course = '',
  histories = [],
  isLastLine,
  lesson,
  lessonId,
  type,
}: CourseOutlineItemProps) => {
  if (!lesson) return null;
  const isActive = lesson._id.toString() === lessonId;
  const lessonItem = JSON.parse(JSON.stringify(lesson));
  const url = course ? `/${course}/lesson?id=${lesson._id.toString()}` : '';
  const isChecked = histories.some(
    (element) => element.lesson.toString() === lesson._id.toString(),
  );

  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lessonItem.course,
        lesson: lessonItem._id,
        checked,
        path: url || '/',
      });
    } catch (error) {
      console.log('🚀 ~ handleCompleteLesson ~ error:', error);
    }
  };

  return (
    <div
      className={cn(
        `flex items-center gap-4 ${type === 'detail' ? 'border-b border-dashed' : ''} p-4 text-sm font-medium last:border-b-0`,
        isActive ? 'font-bold' : '',
      )}
    >
      {!!url && (
        <div className="relative flex shrink-0 items-center justify-center">
          {!isLastLine && (
            <span
              aria-hidden
              className="absolute top-7 left-1/2 h-5 w-px -translate-x-1/2 rounded-full bg-slate-300"
            />
          )}
          <Checkbox
            className="shirk-0 size-4 cursor-pointer rounded-full text-slate-400"
            defaultChecked={isChecked}
            onCheckedChange={(checked) => handleCompleteLesson(checked)}
          />
        </div>
      )}

      {type === 'detail' && <IconPlay className="size-5 shrink-0" />}
      {url ? (
        <Link
          className={cn('line-clamp-1', isActive && 'pointer-events-none')}
          href={url}
        >
          {lessonItem.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1">{lessonItem.title}</h4>
      )}
      <span className="ml-auto shrink-0 text-xs font-medium">
        {lessonItem.duration} phút
      </span>
    </div>
  );
};

export default CourseOutlineItem;
