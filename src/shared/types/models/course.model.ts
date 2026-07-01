import { Document, Schema, Types } from 'mongoose';

import { CourseLevel, CourseStatus } from '@/src/shared/constants';

export interface CourseModelProps extends Document {
  _id: Types.ObjectId;
  title: string;
  image: string;
  intro_url: string;
  desc: string;
  price: number;
  sale_price: number;
  slug: string;
  status: CourseStatus;
  create_at: Date;
  author: Schema.Types.ObjectId;
  level: CourseLevel;
  views: number;
  rating: Schema.Types.ObjectId[];
  info: {
    requirements: string[];
    benefits: string[];
    qa: {
      question: string;
      answer: string;
    }[];
  };
  lectures: Schema.Types.ObjectId[];
  _destroy: boolean;
}
