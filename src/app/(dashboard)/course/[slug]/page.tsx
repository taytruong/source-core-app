import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

import PageNotFound from "@/src/app/not-found";
import LessonContent from "@/src/components/lesson/LessonContent";
import {
  getCourseBySlug,
  getCourseLessonsInfo,
  updateCourseView,
} from "@/src/lib/actions/course.action";
import { getUserInfo } from "@/src/lib/actions/user.actions";
import { IconChecked } from "@/src/shared/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import { courseLevelTitle } from "@/src/shared/constants";
import { ECourseStatus } from "@/src/types/enum";
import { formatMinutesToHour } from "@/src/utils";

import CourseWidget from "./CourseWidget";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  await updateCourseView({ slug: params.slug });
  const data = await getCourseBySlug({
    slug: params.slug,
  });

  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  const { userId } = await auth();
  const findUser = await getUserInfo({
    userId: userId || "",
  });
  const userCourses = findUser?.courses.map((c) => c.toString());
  const videoId = data.intro_url?.split("v=")[1];
  const lectures = data.lectures || [];

  const { duration, lessons }: any = await getCourseLessonsInfo({
    slug: data.slug,
  });

  const ratings = data.rating.map((r: any) => r.content);

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {data.intro_url ? (
            <>
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full object-fill rounded-lg"
                height="788"
                src={`https://www.youtube.com/embed/${videoId}`}
                title=""
                width="1401"
              />
            </>
          ) : (
            <Image
              fill
              alt=""
              className="w-full h-full object-cover rounded-lg"
              src={data.image}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="p-2 px-4 rounded-full bg-linear-to-tr from-primary to-yellow-400 text-sm font-medium text-white"
            >
              {rating}
            </div>
          ))}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.desc}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <BoxInfo title="Bài học">{lessons}</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views.toLocaleString()}</BoxInfo>
            <BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thời lượng">
              {formatMinutesToHour(duration)}
            </BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Nội dung khóa học">
          <LessonContent course="" lectures={lectures} slug="" />
        </BoxSection>
        <BoxSection title="Yêu cầu">
          {data.info.requirements.map((r, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="shrink-0 size-7 rounded flex items-center justify-center text-green-500">
                <IconChecked />
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Lợi ích">
          {data.info.benefits.map((r, index) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="shrink-0 size-7 rounded flex items-center justify-center text-green-500">
                <IconChecked />
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Hỏi đáp ?">
          {data.info.qa.map((qa, index) => (
            <Accordion key={index} collapsible type="single">
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent className="mt-2.5">
                  {qa.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        {userCourses?.includes(data._id.toString()) ? (
          <alreadyEnroll />
        ) : (
          <CourseWidget
            data={data ? JSON.parse(JSON.stringify(data)) : null}
            duration={formatMinutesToHour(duration)}
            findUser={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
          />
        )}
      </div>
    </div>
  );
};

function BoxInfo({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-5">
      <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function BoxSection({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default page;
