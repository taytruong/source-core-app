import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/shared/components/ui/accordion';
import { HistoryItem, LectureItemData } from '@/src/shared/types';

import CourseLessonItem from './course-lesson-item';

interface CourseOutlineProps {
  lectures: LectureItemData[];
  course: string;
  slug: string;
  histories?: HistoryItem[];
}
const CourseOutline = ({
  course = '',
  histories = [],
  lectures = [],
  slug = '',
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
              <div className="mt-2 flex flex-col gap-3">
                {lecture.lessons.map((item) => {
                  return (
                    <CourseLessonItem
                      key={item._id.toString()}
                      course={course}
                      histories={histories}
                      lesson={item}
                      slug={slug}
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
