"use client";
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { ICommentItem } from "@/src/types";
import { MAX_COMMENT_LEVEL } from "@/src/shared/constants";
import { cn } from "@/lib/utils";

interface CommentReplyProps {
  comment: ICommentItem;
  userId: string;
  lessonId: string;
}

const CommentReply = ({ comment, lessonId, userId }: CommentReplyProps) => {
  const [showReplyComment, setShowReplyComment] = useState(false);
  return (
    <>
      <div className="flex items-center gap-5 text-sm text-gray-400 font-medium">
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <button
              type="button"
              className={cn("uppercase text-yellow-400 font-medium", {
                underline: showReplyComment,
              })}
              onClick={() => setShowReplyComment(!showReplyComment)}
            >
              Reply
            </button>
          </>
        )}
      </div>
      {showReplyComment && (
        <div className="mt-3">
          <CommentForm
            isReply
            closeReply={() => setShowReplyComment(false)}
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
