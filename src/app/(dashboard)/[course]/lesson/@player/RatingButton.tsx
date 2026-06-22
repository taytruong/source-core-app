"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconStar } from "@/src/components/icons";
import { ratingList } from "@/src/constanst";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  createRating,
  getRatingByUserId,
} from "@/src/lib/actions/rating.action";
import { toast } from "sonner";

const RatingButton = ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const [ratingValue, setRatingValue] = useState(-1);
  const [ratingContent, setRatingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingCourse = async () => {
    setIsLoading(true);
    try {
      const isAlreadyRated = await getRatingByUserId(userId);
      if (isAlreadyRated) {
        toast.warning("Bạn đã đánh giá khóa học này rồi");
        setIsLoading(false);
        return;
      }
      if (!ratingContent || ratingValue === -1) {
        toast.warning("Vui lòng chọn đánh giá và nhập nội dung đánh giá");
        return;
      }
      const res = await createRating({
        rate: ratingValue,
        content: ratingContent,
        user: userId,
        course: courseId,
      });
      if (res) {
        toast.success("Đánh giá thành công");
        setRatingContent("");
        setRatingValue(-1);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const isDisable = isLoading || ratingValue === -1 || !ratingContent;

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 rounded-lg bg-primary text-sm font-medium px-5 text-white disabled:opacity-50 disabled:cursor-not-allowed">
        <IconStar />
        <span>Đánh giá khóa học</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl tracking-tight font font-medium">
            Đánh giá
          </DialogTitle>
          <DialogDescription>
            <div className="flex justify-between gap-5 mb-5">
              {ratingList.map((rating) => (
                <button
                  key={rating.title}
                  className="flex flex-col gap-3 text-center text-xs items-center"
                  type="button"
                  onClick={() => setRatingValue(rating.value)}
                >
                  <span
                    className={cn(
                      "flexCenter size-10 rounded-full bg-gray-200",
                      ratingValue === rating.value && "bg-primary",
                    )}
                  >
                    <Image
                      width={20}
                      height={20}
                      alt={rating.title}
                      src={`/rating/${rating.title}.png`}
                      className="transition-transform duration-300 hover:scale-[2.1]"
                    />
                  </span>
                  <span className="capitalize">{rating.title}</span>
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Đánh giá của bạn"
              className="h-50 resize-none"
              onChange={(e) => setRatingContent(e.target.value)}
              value={ratingContent}
            />
            <Button
              variant="primary"
              className="w-full mt-5"
              onClick={handleRatingCourse}
              disabled={isDisable}
              isLoading={isLoading}
            >
              Gửi đánh giá
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
