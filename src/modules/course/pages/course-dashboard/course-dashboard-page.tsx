import { fetchCourse } from '../../actions';
import { CourseDashboardContainer } from './components';

async function CourseDashboardPage() {
  const courseList = (await fetchCourse({})) || [];

  return <CourseDashboardContainer courseList={courseList} />;
}

export default CourseDashboardPage;
