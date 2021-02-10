var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getDateFormat = (time: string, value: string) => {
  const dayRef = new Date(time)
  switch (value) {
    case 'day':
      return days[dayRef.getDay()]
    case 'month':
      return months[dayRef.getMonth()]
    case 'dateNumber':
      return String(dayRef.getDate())
    default:
      return 'unknown'
  }

};

export const dateToTimeDashFormat = (date: string): string => {
  const regex = /(\d+-\d+-\d+)/
  const dateToString = date.match(regex)?.splice(1).toString()
  return dateToString ? dateToString : 'unknown'
}