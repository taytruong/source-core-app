import React from "react";

import { IHistory } from "@/src/database/history.md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import { TUpdateCourseLecture } from "@/src/types";

import LessonItem from "./LessonItem";

const LessonContent = ({
  course,
  histories = [],
  lectures,
  slug,
}: {
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
  histories?: IHistory[];
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((item: TUpdateCourseLecture) => (
        <Accordion key={item._id.toString()} collapsible type="single">
          <AccordionItem value={item._id.toString()}>
            <AccordionTrigger>
              <div className="flex items-center gap-3 justify-between w-full pr-5">
                <div className="line-clamp-1">{item.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-transparent! border-none">
              <div className="flex flex-col gap-3 mt-2">
                {item.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson._id.toString()}
                    isActive={slug ? lesson.slug === slug : false}
                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                    url={course ? `/${course}/lesson?slug=${lesson.slug}` : ""}
                    isChecked={histories.some(
                      (element) => element.lesson.toString() === lesson._id.toString(),
                    )}
                   />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonContent;
