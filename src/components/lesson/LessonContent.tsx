import { TUpdateCourseLecture } from "@/src/types";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "./LessonItem";
import { IHistory } from "@/src/database/history.md";

const LessonContent = ({
  lectures,
  course,
  slug,
  histories = [],
}: {
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
  histories?: IHistory[];
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((item: TUpdateCourseLecture) => (
        <Accordion type="single" collapsible key={item._id.toString()}>
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
                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                    key={lesson._id.toString()}
                    url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                    isActive={!slug ? false : lesson.slug === slug}
                    isChecked={histories.some(
                      (el) => el.lesson.toString() === lesson._id.toString(),
                    )}
                  ></LessonItem>
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
