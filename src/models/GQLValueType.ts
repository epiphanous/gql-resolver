import { List, Map } from 'immutable';

export type GQLValueType =
  | string
  | number
  | boolean
  | null
  | List<GQLValueType>
  | Map<string, GQLValueType>;
