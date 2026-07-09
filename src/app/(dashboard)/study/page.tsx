import { StudyPage } from '@/src/modules/course/pages';
import { Header } from '@/src/shared/components/layout';

const StudyPageRoot = async () => {
  return (
    <>
      <Header title="Khu vực luyện tập" />
      <StudyPage />
    </>
  );
};

export default StudyPageRoot;
