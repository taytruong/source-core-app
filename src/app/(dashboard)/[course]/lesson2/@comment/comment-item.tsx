'use client';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { CommentStatus } from '@/src/shared/constants';
import { formatDate, getRepliesComment, timeAgo } from '@/src/shared/utils';
import { CommentItem } from '@/src/types';

import CommentReply from './comment-reply';

interface CommentItemProps {
  comment: CommentItem;
  lessonId: string;
  userId: string;
  comments: CommentItem[];
}

const CommentItem = ({
  comment,
  comments = [],
  lessonId,
  userId,
}: CommentItemProps) => {
  // replies gọi đệ quy để reply comment
  const replies = getRepliesComment(comments, comment._id.toString());
  const level = comment.level || 0;
  const COMMENT_SPACING = 55;
  const isPending = comment.status === CommentStatus.PENDING;

  return (
    <>
      <div
        key={comment._id.toString()}
        className={cn('ml-auto flex items-start gap-3', {
          'pointer-events-none opacity-50': isPending,
          'mt-5 first:mt-0': level === 0,
        })}
        style={{
          width: `calc(100% - ${level * COMMENT_SPACING}px)`,
        }}
      >
        <div className="size-10 shrink-0 rounded-full border border-slate-300 shadow-sm">
          <Image
            alt={comment.user.name}
            className="rounded-full object-cover"
            height={40}
            src={comment.user.avatar}
            width={40}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="mb-1 flex justify-between text-sm font-medium">
            <div className="flex items-center gap-2">
              <h4 className="">{comment.user.name}</h4>
              <span className="size-1 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-500">
                {timeAgo(comment.create_at)}
              </span>
            </div>
            {/* <div className="flex items-center gap-4">
              <button className="transition-all text-green-400">Duyệt</button>
              <button className="transition-all text-red-400">Xóa</button>
            </div> */}
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-3 flex flex-row justify-between text-sm leading-relaxed font-medium text-gray-600">
              <p>{comment.content}</p>
              <span>{formatDate(comment?.create_at)}</span>
            </div>
            {!isPending && (
              <CommentReply
                comment={comment}
                lessonId={lessonId}
                userId={userId}
              />
            )}
          </div>
        </div>
      </div>
      {replies.length > 0 &&
        replies.map((reply) => (
          <CommentItem
            key={reply._id.toString()}
            comment={reply}
            comments={comments}
            lessonId={lessonId}
            userId={userId}
          />
        ))}
    </>
  );
};

export default CommentItem;
