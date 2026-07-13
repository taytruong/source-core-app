import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/shared/components/ui/accordion';
import { HistoryItem, LectureItemData } from '@/src/shared/types';

import CourseOutlineItem from './course-outline-item';

interface CourseOutlineProps {
  lectures: LectureItemData[];
  course: string;
  lessonId: string;
  histories?: HistoryItem[];
  type?: string;
}
const CourseOutline = ({
  course = '',
  histories = [],
  lectures = [],
  lessonId = '',
  type,
}: CourseOutlineProps) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture) => (
        <Accordion
          key={lecture._id.toString()}
          collapsible
          type="single"
        >
          <AccordionItem value={lecture._id.toString()}>
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between gap-3 pr-5">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-none bg-transparent!">
              <div
                className={`mt-2 flex flex-col rounded-xl ${type === 'detail' ? 'bg-white' : 'bg-item'} p-2 shadow-sm`}
              >
                {lecture.lessons.map((item, index) => {
                  return (
                    <CourseOutlineItem
                      key={item._id.toString()}
                      course={course}
                      histories={histories}
                      isLastLine={index === lecture.lessons.length - 1}
                      lesson={item}
                      lessonId={lessonId}
                      type={type}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default CourseOutline;
