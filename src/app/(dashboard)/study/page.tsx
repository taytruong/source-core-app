import { StudyPage } from '@/src/modules/course/pages';
import { Heading } from '@/src/shared/components';

const StudyPageRoot = async () => {
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <StudyPage />
    </>
  );
};

export default StudyPageRoot;
