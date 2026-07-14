'use client';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

import { createRating, getRatingByUserId } from '@/src/modules/rating/actions';
import { IconStar } from '@/src/shared/components/icons';
import { Button } from '@/src/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/components/ui/dialog';
import { Textarea } from '@/src/shared/components/ui/textarea';
import { ratingList } from '@/src/shared/constants';
import { useUserContext } from '@/src/shared/contexts';
import { cn } from '@/src/shared/utils';

interface RatingButtonProps {
  courseId: string;
}

const RatingButton = ({ courseId }: RatingButtonProps) => {
  const { userInfo } = useUserContext();
  const userId = userInfo?._id.toString() || '';
  const [ratingValue, setRatingValue] = useState(-1);
  const [ratingContent, setRatingContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingCourse = async () => {
    setIsLoading(true);
    try {
      const isAlreadyRated = await getRatingByUserId(userId, courseId);

      if (isAlreadyRated) {
        toast.warning(
          'You have already rated this course ! , You see your rating in the course detail page',
        );
        setIsLoading(false);

        return;
      }
      if (!ratingContent || ratingValue === -1) {
        toast.warning('Please select a rating and enter your review');

        return;
      }
      const hasResult = await createRating({
        rate: ratingValue,
        content: ratingContent,
        user: userId,
        course: courseId,
      });

      if (hasResult) {
        toast.success('Rating submitted successfully');
        setRatingContent('');
        setRatingValue(-1);
      }
    } catch (error) {
      console.log('🚀 ~ handleRatingCourse ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisable = isLoading || ratingValue === -1 || !ratingContent;

  return (
    <Dialog>
      <DialogTrigger className="bg-primary button-primary flex items-center gap-3 rounded-lg px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
        <IconStar className="size-5" />
        <span>Rate Course</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font mb-5 text-xl font-medium tracking-tight">
            Rate Course
          </DialogTitle>
          <DialogDescription>
            <div className="mb-5 flex justify-between gap-5">
              {ratingList.map((rating) => (
                <button
                  key={rating.title}
                  className="flex flex-col items-center gap-3 text-center text-xs"
                  type="button"
                  onClick={() => setRatingValue(rating.value)}
                >
                  <span
                    className={cn(
                      'flexCenter size-10 rounded-full bg-gray-200',
                      ratingValue === rating.value && 'bg-primary',
                    )}
                  >
                    <Image
                      alt={rating.title}
                      className="transition-transform duration-300 hover:scale-[2.1]"
                      height={20}
                      src={`/rating/${rating.title}.png`}
                      width={20}
                    />
                  </span>
                  <span className="capitalize">{rating.title}</span>
                </button>
              ))}
            </div>
            <Textarea
              className="h-50 resize-none"
              placeholder="Rating content"
              value={ratingContent}
              onChange={(event) => setRatingContent(event.target.value)}
            />
            <Button
              className="button-primary mt-5 w-full"
              disabled={isDisable}
              isLoading={isLoading}
              variant="primary"
              onClick={handleRatingCourse}
            >
              Submit Rating
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
