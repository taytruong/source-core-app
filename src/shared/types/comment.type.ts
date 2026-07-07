import { CommentModelProps } from './models';

export interface CommentItemData extends Omit<CommentModelProps, 'user'> {
  user: {
    name: string;
    avatar: string;
  };
}
