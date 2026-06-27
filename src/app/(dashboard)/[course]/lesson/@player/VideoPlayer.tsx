"use client";
import React from "react";

import { Button } from "@/src/shared/components/ui/button";
import useGlobalStore from "@/src/store";

import LessonNavigation from "../LessonNavigation";
import RatingButton from "./RatingButton";

// process host url for YT
export const getYoutubeVideoId = (url: string | undefined) => {
  if (!url) return;
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    return parsedUrl.searchParams.get("v");
  } catch {
    
  }
};

const VideoPlayer = ({
  data,
  nextLesson,
  prevLesson,
  videoId,
}: {
  videoId: string | undefined;
  nextLesson: string;
  prevLesson: string;
  data: {
    courseId: string;
    userId: string;
  };
}) => {
  const urlVideoId = getYoutubeVideoId(videoId);
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();

  return (
    <>
      <div className="relative mb-5 aspect-video">
        <iframe
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          className="w-full h-full object-fill rounded-xl"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube.com/embed/${urlVideoId}?rel=0`}
         />
      </div>
      <div className="flex items-center justify-between mb-5">
        <LessonNavigation nextLesson={nextLesson} prevLesson={prevLesson} />
        <div className="flex gap-5">
          <RatingButton
            courseId={data.courseId}
            userId={data.userId}
           />
          <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
            {expandedPlayer ? "Mặc định" : "Chế độ rạp chiếu"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
