import Image from 'next/image';

import PageNotFound from '@/src/app/not-found';
import { courseLevelTitle, CourseStatus } from '@/src/shared/constants';
import { CourseLessonDuration, CourseQA } from '@/src/shared/types';
import { formatMinutesToHour } from '@/src/shared/utils';

import { getCourseLessonsInfo } from '../../../actions';
import { CourseProps } from '../../../types';
import BenefitItem from './benefit-item';
import CourseOutline from './course-outline';
import CourseWidget from './course-widget';
import QaItem from './qa-item';
import RatingItem from './rating-item';
import RequirementItem from './requirement-item';
import SectionBoxItem from './section-box-item';
import SectionInfoItem from './section-info-item';

export interface CourseDetailsContainerProps {
  userId?: string | null;
  courseDetails: CourseProps | undefined;
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
  const questionAnswer = courseDetails.info.qa || [];

  const courseDetailsMeta: {
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Bài học',
      content: getLessonInfo.lessons,
    },
    {
      title: 'Lượt xem',
      content: courseDetails.views.toLocaleString(),
    },

    {
      title: 'Trình độ',
      content: courseLevelTitle[courseDetails.level],
    },
    {
      title: 'Thời lượng xem',
      content: formatMinutesToHour(getLessonInfo.duration),
    },
  ];

  const courseDetailsInfo: {
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'Mô tả',
      content: <div className="leading-normal">{courseDetails.desc}</div>,
    },
    {
      title: 'Thông tin',
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
      title: 'Nội dung khóa học',
      content: (
        <CourseOutline
          course=""
          lectures={courseDetails.lectures}
          slug=""
        />
      ),
    },
    {
      title: 'Yêu cầu',
      content: requirements.map((item) => (
        <RequirementItem
          key={item}
          title={item}
        />
      )),
    },
    {
      title: 'Lợi ích',
      content: benefits.map((item) => (
        <BenefitItem
          key={item}
          title={item}
        />
      )),
    },
    {
      title: 'Hỏi đáp ?',
      content: (
        <div className="flex flex-col gap-4">
          {questionAnswer.map((item: CourseQA) => (
            <QaItem
              key={item.question}
              item={item}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="grid min-h-screen items-start gap-10 lg:grid-cols-[2fr_1fr]">
      <div>
        <div className="relative mb-5 aspect-video shadow-sm">
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
        <div className="mb-5 flex flex-wrap gap-2">
          {ratings.map((rating, index) => (
            <RatingItem
              key={index}
              rating={rating}
            />
          ))}
        </div>
        <h1 className="mb-5 text-3xl font-semibold uppercase">
          {courseDetails?.title}
        </h1>
        {courseDetailsInfo.map((item) => (
          <SectionBoxItem
            key={item.title}
            title={item.title}
          >
            <div className="leading-normal">{item.content}</div>
          </SectionBoxItem>
        ))}
      </div>
      <CourseWidget
        data={courseDetails}
        duration={formatMinutesToHour(getLessonInfo.duration)}
      />
    </div>
  );
}

export default CourseDetailsContainer;
