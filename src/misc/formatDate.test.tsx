import { getDateFormat, dateToTimeDashFormat } from "./formatDate";

const correctFormatDate = '2021-02-10'
describe('getDateFormat', () => {
  it('should return string 10 from correctFormatDate', () => {
    expect(getDateFormat(correctFormatDate, 'dateNumber')).toBe("10")
    expect(getDateFormat(correctFormatDate, 'month')).toBe("February")
    expect(getDateFormat(correctFormatDate, 'day')).toBe("Wednesday")
  })
  it('should return unknown if date format is wrong', () => {
    expect(getDateFormat(correctFormatDate, 'wrong format')).toBe("unknown")
  })
})
const givenDate = '2021-02-10:12'
describe('dateToTimeDashFormat', () => {
  it('should return string 2021-02-10 from givenDate', () => {
    expect(dateToTimeDashFormat(givenDate,)).toBe("2021-02-10")
  })
  it('should return unknown if date format is wrong', () => {
    expect(dateToTimeDashFormat('wrong format')).toBe("unknown")
  })
})
