import Image from 'next/image';

import PageNotFound from '@/src/app/not-found';
import { CourseOutline } from '@/src/shared/components/common';
import { courseLevelTitle, CourseStatus } from '@/src/shared/constants';
import { formatMinutesToHour } from '@/src/shared/helper';
import { CourseLessonDuration } from '@/src/shared/types';

import { getCourseLessonsInfo } from '../../../actions';
import { CourseItemData } from '../../../types';
import BenefitItem from './benefit-item';
import CourseWidget from './course-widget';
import RatingItem from './rating-item';
import RequirementItem from './requirement-item';
import SectionBoxItem from './section-box-item';
import SectionInfoItem from './section-info-item';

export interface CourseDetailsContainerProps {
  userId?: string | null;
  courseDetails: CourseItemData | undefined;
}

async function CourseDetailsContainer({
  courseDetails,
}: CourseDetailsContainerProps) {
  const isEmptyData =
    !courseDetails || courseDetails.status !== CourseStatus.APPROVED;

  if (isEmptyData) return <PageNotFound />;
  const ratings = courseDetails.rating.map((item) => item.content);
  const videoId = courseDetails.intro_url?.split('v=')[1];

  const getLessonInfo: CourseLessonDuration = (await getCourseLessonsInfo({
    slug: courseDetails.slug,
  })) || { duration: 0, lessons: 0 };

  const requirements = courseDetails.info.requirements || [];
  const benefits = courseDetails.info.benefits || [];
  // const questionAnswer = courseDetails.info.qa || [];

  const courseDetailsMeta: {
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Lesson',
      content: getLessonInfo.lessons,
    },
    {
      title: 'Views',
      content: courseDetails.views.toLocaleString(),
    },

    {
      title: 'Level',
      content: courseLevelTitle[courseDetails.level],
    },
    {
      title: 'Duration',
      content: formatMinutesToHour(getLessonInfo.duration),
    },
  ];

  const courseDetailsInfo: {
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Description',
      content: courseDetails.desc ? (
        <div className="rounded-lg bg-white p-5 leading-normal font-medium shadow-md">
          {courseDetails.desc}
        </div>
      ) : (
        <div className="rounded-lg bg-white p-5 font-medium shadow-md">
          Updating ...
        </div>
      ),
    },
    {
      title: 'Information',
      content: (
        <div className="mb-10 grid grid-cols-4 gap-5">
          {courseDetailsMeta.map((item) => (
            <SectionInfoItem
              key={item.title}
              title={item.title}
            >
              {item.content}
            </SectionInfoItem>
          ))}
        </div>
      ),
    },
    {
      title: 'Course Content',
      content: (
        <CourseOutline
          course=""
          lectures={courseDetails.lectures}
          lessonId=""
          type="detail"
        />
      ),
    },
    // {
    //   title: 'Requirements',
    //   content: requirements.map((item) => (
    //     <RequirementItem
    //       key={item}
    //       title={item}
    //     />
    //   )),
    // },
    // {
    //   title: 'Benefits',
    //   content: benefits.map((item) => (
    //     <BenefitItem
    //       key={item}
    //       title={item}
    //     />
    //   )),
    // },
    // {
    //   title: 'Questions & Answers ?',
    //   content: (
    //     <div className="flex flex-col gap-4">
    //       {questionAnswer.map((item: CourseQA) => (
    //         <QaItem
    //           key={item.question}
    //           item={item}
    //         />
    //       ))}
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="grid min-h-screen items-start gap-10 lg:grid-cols-[2fr_1fr]">
      <div>
        <div className="relative mb-10 aspect-video shadow-sm">
          {courseDetails.intro_url ? (
            <>
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="h-full w-full rounded-lg object-fill"
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
              className="h-full w-full rounded-lg object-cover"
              src={courseDetails.image}
            />
          )}
        </div>

        <h1 className="mb-10 text-3xl font-semibold uppercase">
          {courseDetails?.title}
        </h1>

        <div className="grid grid-cols-2 gap-5 lg:flex-row">
          <div>
            <SectionBoxItem title="Requirements">
              {requirements.map((item) => (
                <RequirementItem
                  key={item}
                  title={item}
                />
              ))}
            </SectionBoxItem>
          </div>
          <div>
            <SectionBoxItem title="Benefits">
              {benefits.map((item) => (
                <BenefitItem
                  key={item}
                  title={item}
                />
              ))}
            </SectionBoxItem>
          </div>
        </div>

        {courseDetailsInfo.map((item) => (
          <SectionBoxItem
            key={item.title}
            title={item.title}
          >
            <div className="leading-normal">{item.content}</div>
          </SectionBoxItem>
        ))}

        <SectionBoxItem title="Feedback">
          <div className="mb-5 flex flex-wrap gap-2">
            {ratings.map((rating: string, index: number) => (
              <RatingItem
                key={index}
                rating={rating}
              />
            ))}
          </div>
        </SectionBoxItem>
      </div>
      <CourseWidget
        data={courseDetails}
        duration={formatMinutesToHour(getLessonInfo.duration)}
      />
    </div>
  );
}

export default CourseDetailsContainer;
