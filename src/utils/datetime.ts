import { DEFAULT_DATE_TIME_FORMAT } from '@/const/datetime';
import dayjs from 'dayjs';

export const formatFromUtcToLocalDateTime = (
  dateTimeUtc: string,
  format: string = DEFAULT_DATE_TIME_FORMAT
) => {
  if (!dateTimeUtc) return '';
  return dayjs(dateTimeUtc).format(format);
};
