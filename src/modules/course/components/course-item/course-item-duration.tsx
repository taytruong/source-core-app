'use client';

import { useEffect, useState } from 'react';

import { IconClock } from '@/src/shared/components/icons';
import { formatMinutesToHour } from '@/src/shared/utils';

import { getCourseLessonsInfo } from '../../actions';

export interface CourseItemDurationProps {
  slug: string;
}

function CourseItemDuration({ slug }: CourseItemDurationProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    async function getDuration() {
      const respone = await getCourseLessonsInfo({ slug });

      setDuration(respone?.duration || 0);
    }
    getDuration();
  }, [slug]);

  return (
    <div className="flex items-center gap-2">
      <IconClock className="size-5" />
      <span>{formatMinutesToHour(duration)}</span>
    </div>
  );
}

export default CourseItemDuration;
