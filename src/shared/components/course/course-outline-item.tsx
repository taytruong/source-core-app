'use client';

import Link from 'next/link';

import { createHistory } from '@/src/modules/history/actions';
import { IconPlay } from '@/src/shared/components/icons';
import { Checkbox } from '@/src/shared/components/ui/checkbox';
import { HistoryItem, LessonItemData } from '@/src/shared/types';

import { cn } from '../../utils';

interface CourseOutlineItemProps {
  lesson: LessonItemData;
  histories?: HistoryItem[];
  course: string;
  lessonId: string;
}
const CourseOutlineItem = ({
  course = '',
  histories = [],
  lesson,
  lessonId,
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
        'flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-4 text-base font-medium',
        isActive
          ? 'decoration-primary underline decoration-2 underline-offset-4'
          : '',
      )}
    >
      {!!url && (
        <Checkbox
          className="shirk-0 size-3.5 text-slate-400"
          defaultChecked={isChecked}
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}

      <IconPlay className="size-5 shrink-0" />
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
