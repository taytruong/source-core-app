import { fetchCourseBySlug } from '../../actions';
import UpdateContentCourseContainer from './components';

export interface UpdateContentCoursePageProps {
  slug: string;
}

async function UpdateContentCoursePage({ slug }: UpdateContentCoursePageProps) {
  const foundCourse = await fetchCourseBySlug({
    slug,
  });

  if (!foundCourse) return null;

  return <UpdateContentCourseContainer course={foundCourse} />;
}

export default UpdateContentCoursePage;
