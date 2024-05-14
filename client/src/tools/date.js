import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

export const dateConverter = (date) => dayjs(date).format('DD/MM/YYYY');
