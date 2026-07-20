'use client';
import { useState } from 'react';

import { MAX_COMMENT_LEVEL } from '@/src/shared/constants';
import { CommentItemData } from '@/src/shared/types';
import { cn } from '@/src/shared/utils';

import CommentForm from './comment-form';

interface CommentReplyProps {
  comment: CommentItemData;
  lessonId: string;
}

const CommentReply = ({ comment, lessonId }: CommentReplyProps) => {
  const [isShowReplyComment, setIsShowReplyComment] = useState(false);

  return (
    <>
      <div className="flex items-center gap-5 text-sm font-medium text-gray-400">
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <button
              type="button"
              className={cn('font-semibold text-slate-400', {
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
          />
        </div>
      )}
    </>
  );
};

export default CommentReply;
