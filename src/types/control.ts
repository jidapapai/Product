import type { ESortOrder } from '@/enums/control';

export interface IAutoCompleteOption {
  value: string;
  text: string;
}

export interface ISortFilter {
  field: string;
  order: ESortOrder;
}
