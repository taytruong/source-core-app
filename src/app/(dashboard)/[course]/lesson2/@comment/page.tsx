import { auth } from '@clerk/nextjs/server';

import { getCommentsByLesson } from '@/src/modules/comment/actions';
import { fetchCourseBySlug } from '@/src/modules/course/actions';
import { getLessonBySlug } from '@/src/modules/lesson/actions';
import { getUserInfo } from '@/src/modules/user/actions';

import CommentForm from './comment-form';
import CommentItem from './comment-item';
import CommentSorting from './comment-sorting';

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
    sort: 'recent' | 'oldest';
  };
}) => {
  const { userId } = await auth();
  const findUser = await getUserInfo({ userId: userId! });
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await fetchCourseBySlug({ slug: course });

  if (!findCourse) return null;
  const lesson = await getLessonBySlug({
    slug: slug,
    course: findCourse?._id.toString(),
  });
  const comments = await getCommentsByLesson(
    lesson?._id.toString() || '',
    searchParams.sort,
  );

  const commentLessonId = lesson?._id.toString() || '';
  const commentUserId = findUser?._id.toString() || '';

  // lấy n~ Post comment ko lấy Reply comment nên trừ parentId vì Reply comment chứa parentId
  const rootComments = comments?.filter((item) => !item.parentId);

  return (
    <div>
      <CommentForm
        lessonId={commentLessonId}
        userId={commentUserId}
      />
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
              <CommentItem
                key={item._id.toString()}
                comment={item}
                comments={comments || []}
                lessonId={commentLessonId}
                userId={commentUserId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
