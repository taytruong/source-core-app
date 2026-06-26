"use client";
import React from "react";
import LessonNavigation from "../LessonNavigation";
import useGlobalStore from "@/src/store";
import { Button } from "@/src/shared/components/ui/button";
import RatingButton from "./RatingButton";

// process host url for YT
export const getYoutubeVideoId = (url: string | undefined) => {
  if (!url) return undefined;
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    return parsedUrl.searchParams.get("v");
  } catch {
    return undefined;
  }
};

const VideoPlayer = ({
  videoId,
  nextLesson,
  prevLesson,
  data,
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
          className="w-full h-full object-fill rounded-xl"
          src={`https://www.youtube.com/embed/${urlVideoId}?rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex items-center justify-between mb-5">
        <LessonNavigation nextLesson={nextLesson} prevLesson={prevLesson} />
        <div className="flex gap-5">
          <RatingButton
            courseId={data.courseId}
            userId={data.userId}
          ></RatingButton>
          <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
            {expandedPlayer ? "Mặc định" : "Chế độ rạp chiếu"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
