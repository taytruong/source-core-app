'use client';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { MAX_COMMENT_LEVEL } from '@/src/shared/constants';
import { CommentItem } from '@/src/types';

import CommentForm from './comment-form';

interface CommentReplyProps {
  comment: CommentItem;
  userId: string;
  lessonId: string;
}

const CommentReply = ({ comment, lessonId, userId }: CommentReplyProps) => {
  const [isShowReplyComment, setIsShowReplyComment] = useState(false);

  return (
    <>
      <div className="flex items-center gap-5 text-sm font-medium text-gray-400">
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <button
              type="button"
              className={cn('font-medium text-yellow-400 uppercase', {
                underline: isShowReplyComment,
              })}
              onClick={() => setIsShowReplyComment(!isShowReplyComment)}
            >
              Reply
            </button>
          </>
        )}
      </div>
      {!!isShowReplyComment && (
        <div className="mt-3">
          <CommentForm
            isReply
            closeReply={() => setIsShowReplyComment(false)}
            comment={comment}
            lessonId={lessonId}
            userId={userId}
          />
        </div>
      )}
    </>
  );
};

export default CommentReply;
