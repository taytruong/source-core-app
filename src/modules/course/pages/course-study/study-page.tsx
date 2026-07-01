import { auth } from '@clerk/nextjs/server';

import { fetchCourseOfUser } from '../../actions';
import { StudyPageContainer } from './components';

async function StudyPage() {
  const { userId } = await auth();
  const courses = (await fetchCourseOfUser(userId || '')) || [];

  return <StudyPageContainer courses={courses} />;
}

export default StudyPage;
