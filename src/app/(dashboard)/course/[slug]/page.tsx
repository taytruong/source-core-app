import PageNotFound from "@/src/app/not-found";
import { IconChecked } from "@/src/shared/components/icons";
import { courseLevelTitle, ratingList } from "@/src/shared/constants";
import {
  getCourseBySlug,
  getCourseLessonsInfo,
  updateCourseView,
} from "@/src/lib/actions/course.action";
import { ECourseStatus } from "@/src/types/enum";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import LessonContent from "@/src/components/lesson/LessonContent";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/src/lib/actions/user.actions";
import CourseWidget from "./CourseWidget";
import AlreadyEnroll from "./AlreadyEnroll";
import { formatMinutesToHour } from "@/src/utils";

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
                width="1401"
                height="788"
                src={`https://www.youtube.com/embed/${videoId}`}
                title=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full object-fill rounded-lg"
              ></iframe>
            </>
          ) : (
            <Image
              src={data.image}
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
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
          <LessonContent lectures={lectures} course="" slug="" />
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
            <Accordion type="single" collapsible key={index}>
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
          <AlreadyEnroll></AlreadyEnroll>
        ) : (
          <CourseWidget
            findUser={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
            data={data ? JSON.parse(JSON.stringify(data)) : null}
            duration={formatMinutesToHour(duration)}
          ></CourseWidget>
        )}
      </div>
    </div>
  );
};

function BoxInfo({
  title,
  children,
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
  title,
  children,
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
