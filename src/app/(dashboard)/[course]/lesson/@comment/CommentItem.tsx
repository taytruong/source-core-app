"use client";
import { formatDate, getRepliesComment, timeAgo } from "@/src/utils";
import Image from "next/image";
import CommentReply from "./CommentReply";
import React from "react";
import { ICommentItem } from "@/src/types";
import { ECommentStatus } from "@/src/types/enum";
import { cn } from "@/lib/utils";

interface ICommentItemProps {
  comment: ICommentItem;
  lessonId: string;
  userId: string;
  comments: ICommentItem[];
}

const CommentItem = ({
  comment,
  lessonId,
  userId,
  comments = [],
}: ICommentItemProps) => {
  // replies gọi đệ quy để reply comment
  const replies = getRepliesComment(comments, comment._id.toString());
  const level = comment.level || 0;
  const COMMENT_SPACING = 55;
  const isPending = comment.status === ECommentStatus.PENDING;

  return (
    <>
      <div
        key={comment._id.toString()}
        className={cn("flex items-start gap-3 ml-auto", {
          "opacity-50 pointer-events-none": isPending,
          "mt-5 first:mt-0": level === 0,
        })}
        style={{
          width: `calc(100% - ${level * COMMENT_SPACING}px)`,
        }}
      >
        <div className="size-10 rounded-full border border-slate-300 shadow-sm shrink-0">
          <Image
            src={comment.user.avatar}
            alt={comment.user.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between mb-1 font-medium text-sm">
            <div className="flex items-center gap-2">
              <h4 className="">{comment.user.name}</h4>
              <span className="rounded-full size-1 bg-gray-500"></span>
              <span className=" text-gray-500 text-xs">
                {timeAgo(comment.create_at)}
              </span>
            </div>
            {/* <div className="flex items-center gap-4">
              <button className="transition-all text-green-400">Duyệt</button>
              <button className="transition-all text-red-400">Xóa</button>
            </div> */}
          </div>
          <div className="p-5 rounded-lg bg-white shadow-sm">
            <div className="flex flex-row justify-between text-sm mb-3 leading-relaxed text-gray-600 font-medium">
              <p>{comment.content}</p>
              <span>{formatDate(comment?.create_at)}</span>
            </div>
            {!isPending && (
              <CommentReply
                lessonId={lessonId}
                userId={userId}
                comment={comment}
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
            lessonId={lessonId}
            userId={userId}
            comments={comments}
          ></CommentItem>
        ))}
    </>
  );
};

export default CommentItem;
