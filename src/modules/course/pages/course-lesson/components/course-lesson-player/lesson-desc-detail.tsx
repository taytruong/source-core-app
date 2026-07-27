import { Heading } from '@/src/shared/components/common';

export interface LessonDescDetailProps {
  lessonDetails: {
    title: string;
    content: string;
  };
}

function LessonDescDetail({ lessonDetails }: LessonDescDetailProps) {
  return (
    <div className="entry-content bg-item rounded-lg p-5 shadow-sm">
      <Heading className="mb-5 font-semibold">{lessonDetails.title}</Heading>
      <div dangerouslySetInnerHTML={{ __html: lessonDetails.content || '' }} />
    </div>
  );
}

export default LessonDescDetail;
