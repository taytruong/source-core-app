import { HistoryModelProps } from './models';

export interface HistoryItem extends Omit<HistoryModelProps, ''> {}

export type CreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path: string;
};
