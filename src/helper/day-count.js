/* eslint-disable no-nested-ternary */
import moment from 'moment/moment';

const countDays = (inputDate) => {
  const inputMoment = moment(inputDate, 'YYYY-MM-DD');
  const currentMoment = moment();
  const daysDifference = moment(inputDate).isSame(moment(), 'day')
    ? 'Today'
    : moment(inputDate).isSame(moment().clone().add(-1, 'day'), 'day')
    ? 'Yesterday'
    : currentMoment.diff(inputMoment, 'days');
  return daysDifference;
};

export default countDays;
