import { CourseDashboardPage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';

function HomePageRoot() {
  return (
    <>
      <Header title="Khám phá" />
      <CourseDashboardPage />
    </>
  );
}

export default HomePageRoot;
