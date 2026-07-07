import { getCommentsByLesson } from '@/src/modules/comment/actions';
import { getLessonBySlug } from '@/src/modules/lesson/actions';
import { SortQueryParams } from '@/src/shared/types';

import CommentField from './comment-field';
import CommentForm from './comment-form';
import CommentSorting from './comment-sorting';

export interface CourseLessonCommentProps {
  courseId: string;
  lessonSlug: string;
  sort: SortQueryParams;
}

async function CourseLessonComment({
  courseId,
  lessonSlug,
  sort,
}: CourseLessonCommentProps) {
  const lesson = await getLessonBySlug({
    slug: lessonSlug,
    course: courseId,
  });
  const lessonId = lesson?._id.toString() || '';

  if (!lessonId) return null;

  const comments = await getCommentsByLesson(lessonId, sort);
  const commentLessonId = lessonId;

  // lấy n~ Post comment ko lấy Reply comment nên trừ parentId vì Reply comment chứa parentId
  const rootComments = comments?.filter((item) => !item.parentId);

  return (
    <div>
      <CommentForm lessonId={commentLessonId} />
      {!!rootComments && rootComments?.length > 0 && (
        <div className="mt-10 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-medium">
              <span>Comments</span>
              <span className="flexCenter bg-primary rounded-full px-4 py-0.5 text-sm text-white">
                {comments?.length}
              </span>
            </h2>
            <CommentSorting />
          </div>
          <div className="flex flex-col gap-5">
            {rootComments?.map((item) => (
              <CommentField
                key={item._id.toString()}
                comment={item}
                comments={comments || []}
                lessonId={commentLessonId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseLessonComment;
