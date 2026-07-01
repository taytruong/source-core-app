import { fetchCourseDashboard } from '../../actions';
import { CourseDashboardContainer } from './components';

async function CourseDashboardPage() {
  const courseList = (await fetchCourseDashboard({})) || [];

  return <CourseDashboardContainer courseList={courseList} />;
}

export default CourseDashboardPage;
