'use client';

import { useRouter } from 'next/navigation';

import { IconNext, IconPrevious } from '@/src/shared/components/icons';
import { Button } from '@/src/shared/components/ui/button';

interface LessonNavigationProps {
  nextLesson: string;
  prevLesson: string;
}

const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: LessonNavigationProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button
        className="flex size-8 items-center justify-center rounded-md border border-slate-200 p-1.5 transition-all"
        disabled={!prevLesson}
        onClick={() => (prevLesson ? router.push(prevLesson) : null)}
      >
        <IconPrevious />
      </Button>
      <Button
        className="flex size-8 items-center justify-center rounded-md border border-slate-200 p-1.5 transition-all"
        disabled={!nextLesson}
        onClick={() => (nextLesson ? router.push(nextLesson) : null)}
      >
        <IconNext />
      </Button>
    </div>
  );
};

export default LessonNavigation;
