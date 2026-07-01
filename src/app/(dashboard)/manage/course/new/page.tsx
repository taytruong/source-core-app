import { auth } from '@clerk/nextjs/server';

import CourseAddNew from '@/src/components/course/course-add-new';
import { getUserInfo } from '@/src/modules/user/actions';
import { Heading } from '@/src/shared/components';

const page = async () => {
  const { userId } = await auth();

  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });

  if (!mongoUser) return null;

  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))} />
    </>
  );
};

export default page;
