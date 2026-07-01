'use client';

import { Button } from '@/src/shared/components/ui/button';
import useGlobalStore from '@/src/store';

import LessonNavigation from '../lesson-navigation';
import RatingButton from './rating-button';

interface VideoPlayerProps {
  videoId: string | undefined;
  nextLesson: string;
  prevLesson: string;
  data: {
    courseId: string;
    userId: string;
  };
}

// process host url for YT
export const getYoutubeVideoId = (url: string | undefined) => {
  if (!url) return;
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1);
    }

    return parsedUrl.searchParams.get('v');
  } catch {}
};

const VideoPlayer = ({
  data,
  nextLesson,
  prevLesson,
  videoId,
}: VideoPlayerProps) => {
  const urlVideoId = getYoutubeVideoId(videoId);
  const { setShouldExpandedPlayer, shouldExpandedPlayer } = useGlobalStore();

  return (
    <>
      <div className="relative mb-5 aspect-video">
        <iframe
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          className="h-full w-full rounded-xl object-fill"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube.com/embed/${urlVideoId}?rel=0`}
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <LessonNavigation
          nextLesson={nextLesson}
          prevLesson={prevLesson}
        />
        <div className="flex gap-5">
          <RatingButton
            courseId={data.courseId}
            userId={data.userId}
          />
          <Button
            onClick={() => setShouldExpandedPlayer(!shouldExpandedPlayer)}
          >
            {shouldExpandedPlayer ? 'Mặc định' : 'Chế độ rạp chiếu'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
