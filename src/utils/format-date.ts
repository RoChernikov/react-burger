import dayjs from 'dayjs';

const formatDate = (utc: string): string => {
  const date = dayjs(utc);
  const isToday = dayjs().startOf('day').isSame(date, 'day');
  if (isToday) return 'Сегодня, ' + date.format('hh:mm');
  const isYesterday = dayjs().subtract(1, 'day').isSame(date, 'day');
  if (isYesterday) return 'Вчера, ' + date.format('hh:mm');
  return date.format('DD:MM, hh:mm');
};

export default formatDate;
