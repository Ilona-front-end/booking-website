import moment from 'moment';

// Convert date
export function formateDate(date) {
  return moment(date).format('MMM Do YYYY');
}
