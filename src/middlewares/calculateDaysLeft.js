import dayjs from 'dayjs';
export const clateDaysLeft=(expireDate)=> {
    const currentDate = dayjs(); // বর্তমান তারিখ
    const targetDate = dayjs(expireDate); // লক্ষ্য তারিখ
  
    if (!targetDate.isValid()) {
      return 'Invalid date';
    }
  
    const daysLeft = targetDate.diff(currentDate, 'day'); // দিনগুলির সংখ্যা
  
    if (daysLeft <= 0) {
      return 'Expired';
    }
  
    return `${daysLeft} days left`;
  };