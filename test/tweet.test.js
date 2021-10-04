const expect = require('chai').expect;
const {
  post,
  daysUntil,
  textEndsWith13,
  toDigits,
  sumDigits,
  textDateSum13,
  textDaysSum13,
  textDayMonthSum13,
  extraText,
  text13th,
  textBirthday,
  textDaysUntil,
  getToday,
  getNextBirthday,
} = require('../src/tweet');

describe('Tweet test', () => {

  it('should return the days from date to date', () => {
    const baseDate = new Date(2021, 10 - 1, 1);
    const sameDate = new Date(2021, 10 - 1, 1);
    const tomorrowDate = new Date(2021, 10 - 1, 2);
    const currentYearDate = new Date(2021, 12 - 1, 10);
    const nextYearDate = new Date(2022, 9 - 1, 30);

    const daysSame = daysUntil(baseDate, sameDate);
    const daysTomorrow = daysUntil(baseDate, tomorrowDate);
    const daysCurrentYear = daysUntil(baseDate, currentYearDate);
    const daysNextYear = daysUntil(baseDate, nextYearDate);

    expect(daysSame).to.be.equal(0);
    expect(daysTomorrow).to.be.equal(1);
    expect(daysCurrentYear).to.be.equal(70);
    expect(daysNextYear).to.be.equal(364);
  });

  it('should return a not empty string when number is 13', () => {
    const text1 = textEndsWith13(13);
    const text2 = textEndsWith13(113);
    const text3 = textEndsWith13(213);
    const text4 = textEndsWith13(313);
    const textEmpty1 = textEndsWith13(10);
    const textEmpty2 = textEndsWith13(124);

    expect(text1).to.satisfy(string => string.startsWith('\n13'));
    expect(text2).to.satisfy(string => string.startsWith('\n113...'));
    expect(text3).to.satisfy(string => string.startsWith('\n213...'));
    expect(text4).to.satisfy(string => string.startsWith('\n313...'));
    expect(textEmpty1).to.be.equal('');
    expect(textEmpty2).to.be.equal('');
  });

  it('should return an array of digits', () => {
    const digitsNumber1 = toDigits(1);
    const digitsNumber2 = toDigits(321);
    const digitsString1 = toDigits('23')
    const digitsString2 = toDigits('0120');

    expect(digitsNumber1).to.be.eql([1]);
    expect(digitsNumber2).to.be.eql([3, 2, 1]);
    expect(digitsString1).to.be.eql([2, 3]);
    expect(digitsString2).to.be.eql([0, 1, 2, 0]);
  });

  it('should return the sum of the digits of number', () => {
    const digitsNumber1 = sumDigits(1);
    const digitsNumber2 = sumDigits(321);
    const digitsString1 = sumDigits('23')
    const digitsString2 = sumDigits('0120');

    expect(digitsNumber1).to.be.equal(1);
    expect(digitsNumber2).to.be.equal(6);
    expect(digitsString1).to.be.equal(5);
    expect(digitsString2).to.be.equal(3); 
  });

  it('should return a not empty string when the sum of the date digits is 13', () => {
    const date1 = new Date(2021, 8 - 1, 5);
    const date2 = new Date(2021, 12 - 1, 28);
    const date3 = new Date(2021, 3 - 1, 19);

    const date4 = new Date(2021, 7 - 1, 11);
    const date5 = new Date(2021, 4 - 1, 21);
    
    const text1 = textDateSum13(date1);
    const text2 = textDateSum13(date2);
    const text3 = textDateSum13(date3);

    const text4 = textDateSum13(date4);
    const text5 = textDateSum13(date5);

    expect(text1).to.satisfy(string => string.startsWith('\nToday is 08/05... 0 + 8 + 0 + 5 = 13'));
    expect(text2).to.satisfy(string => string.startsWith('\nToday is 12/28... 1 + 2 + 2 + 8 = 13'));
    expect(text3).to.satisfy(string => string.startsWith('\nToday is 03/19... 0 + 3 + 1 + 9 = 13'));
    expect(text4).to.be.equal('');
    expect(text5).to.be.equal('');
  });

  it('should return a not empty string when the sum of the left days is 13', () => {
    const text1 = textDaysSum13(49);
    const text2 = textDaysSum13(193);
    const text3 = textDaysSum13(256);
    const text4 = textDaysSum13(364);
    const text5 = textDaysSum13(1);
    const text6 = textDaysSum13(200);
    
    expect(text1).to.satisfy(string => string.startsWith('\n49... 4 + 9 = 13'));
    expect(text2).to.satisfy(string => string.startsWith('\n193... 1 + 9 + 3 = 13'));
    expect(text3).to.satisfy(string => string.startsWith('\n256... 2 + 5 + 6 = 13'));
    expect(text4).to.satisfy(string => string.startsWith('\n364... 3 + 6 + 4 = 13'));
    expect(text5).to.be.equal('');
    expect(text6).to.be.equal('');
  });

  it('should return a not empty string when the sum of month and day is 13', () => {
    const date1 = new Date(2021, 2 - 1, 11);
    const date2 = new Date(2021, 12 - 1, 1);
    const date3 = new Date(2021, 4 - 1, 10);
    const date4 = new Date(2021, 10 - 1, 2);

    const text1 = textDayMonthSum13(date1);
    const text2 = textDayMonthSum13(date2);
    const text3 = textDayMonthSum13(date3);
    const text4 = textDayMonthSum13(date4);

    expect(text1).to.satisfy(string => string.startsWith('\nToday is 02/11... 02 + 11 = 13'));
    expect(text2).to.satisfy(string => string.startsWith('\nToday is 12/01... 12 + 01 = 13'));
    expect(text3).to.be.equal('');
    expect(text4).to.be.equal('');
  });

  it('should return a not empty string when one of the other text functions is true', () => {
    const date1 = new Date(2021, 2 - 1, 11);
    const date2 = new Date(2021, 2 - 1, 11);
    const date3 = new Date(2021, 12 - 1, 1);
    const date4 = new Date(2021, 3 - 1, 11);
    const date5 = new Date(2021, 9 - 1, 3);

    const extra1 = extraText(113, date1);
    const extra2 = extraText(234, date2);
    const extra3 = extraText(10, date3);
    const extra4 = extraText(49, date4);
    const extra5 = extraText(120, date5);

    expect(extra1).to.satisfy(string => string.startsWith('\n113...'));
    expect(extra2).to.satisfy(string => string.startsWith('\nToday is 02/11... 02 + 11 = 13'));
    expect(extra3).to.satisfy(string => string.startsWith('\nToday is 12/01... 12 + 01 = 13'));
    expect(extra4).to.satisfy(string => string.startsWith('\n49... 4 + 9 = 13'));
    expect(extra5).to.be.equal('');
  });

  it('should return a not empty string when the day is 13 and month is not 12', () => {
    const date1 = new Date(2021, 10 - 1, 13);
    const date2 = new Date(2022, 8 - 1, 13);

    const date3 = new Date(2021, 4 - 1, 5);
    const date4 = new Date(2021, 12 - 1, 17);
    const date5 = new Date(2021, 12 - 1, 13);

    const text1 = text13th(date1);
    const text2 = text13th(date2);
    const text3 = text13th(date3);
    const text4 = text13th(date4);
    const text5 = text13th(date5);

    expect(text1).to.satisfy(string => string.startsWith('\nHappy 13th'));
    expect(text2).to.satisfy(string => string.startsWith('\nHappy 13th'));
    expect(text3).to.be.equal('');
    expect(text4).to.be.equal('');
    expect(text5).to.be.equal('');
  });

  it('should return a not empty string when the days is 0', () => {
    const name = 'Taylor';
    const text1 = textBirthday(1, name);
    const text2 = textBirthday(13, name);
    const text3 = textBirthday(0, name);

    expect(text1).to.be.equal('');
    expect(text2).to.be.equal('');
    expect(text3).to.satisfy(string => string.startsWith('Today is Taylor\'s birthday!'));
  });

  it('should return a string with the days until', () => {
    const name = 'Taylor';
    const text1 = textDaysUntil(245, name);
    const text2 = textDaysUntil(1, name);

    expect(text1).to.satisfy(string => string.startsWith('245 days until Taylor\'s'));
    expect(text2).to.satisfy(string => string.startsWith('1 day until Taylor\'s'));
  });

  it('should return the target date of this year, or next year if the target date already passed', () => {
    const today1 = new Date(new Date(2021, 4, 13).setHours(0, 0, 0, 0));
    const today2 = new Date(new Date(2021, 11, 19).setHours(0, 0, 0, 0));

    const month = 12;
    const day = 13;

    const date1 = getNextBirthday(today1, month, day);
    const date2 = getNextBirthday(today2, month, day);

    expect(date1.toDateString()).to.be.equal('Mon Dec 13 2021');
    expect(date2.toDateString()).to.be.equal('Tue Dec 13 2022');
  });
});