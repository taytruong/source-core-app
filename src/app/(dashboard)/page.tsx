import { CourseDashboardPage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';

function HomePageRoot() {
  return (
    <>
      <Header title="Overview." />
      <CourseDashboardPage />
    </>
  );
}

export default HomePageRoot;
