import { GQLError } from '.';

export interface IResolvedResult {
  errors?: GQLError[];
  data?: { [key: string]: any } | null;
}
