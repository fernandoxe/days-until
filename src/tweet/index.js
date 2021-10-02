const dayMs = 60 * 60 * 24 * 1000;

const daysUntil = (today, date) => {
  return Math.round(Math.abs((today - date) / dayMs));
};

const emojis = [
  '😐',
  '🤨',
  '😶',
  '🙄',
  '😵‍💫',
  '🤯',
  '😳',
  '😯',
  '😮',
  '😱',
  '😈',
  '🤡',
  '👀',
];

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomValues = (number, array) => {
  const arrayCopy = [...array];
  const values = [];
  for (let i = 0; i < number; i++) {
    const randomIndex = randomNumber(0, arrayCopy.length);
    const value = arrayCopy.splice(randomIndex, 1);
    values.push(value[0]);
  }
  return values;
};

const randomEmojis = (number) => {
  return randomValues(number, emojis).join(' ');
};

const textEndsWith13 = (number) => {
  let text = '';
  const lastTwoDigits = number % 100;
  if(lastTwoDigits === 13) {
    const firstNumber = Math.floor(number / 100);
    text += '\n';
    text += firstNumber !== 0 ? `${number}... ${firstNumber} ` : '';
    text += `${lastTwoDigits} `;
    text += randomEmojis(3);
  }
  return text;
};

const toDigits = (number) => {
  return `${number}`.split('').map(Number);
};

const sumDigits = (number) => {
  const digits = toDigits(number);console.log('sum', digits, digits.reduce((a, b) => a + b, 0));
  return digits.reduce((a, b) => a + b, 0);
};

const textDateSum13 = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayString = `${day}`.padStart(2, 0);
  const monthString = `${month}`.padStart(2, 0);
  const dateString = `${monthString}${dayString}`;
  const digits = toDigits(dateString);
  const sum = sumDigits(dateString);
  let text = '';
  if(sum === 13) {
    text = `\nToday is ${monthString}/${dayString}... ${digits.join(' + ')} = 13 `;
    text += randomEmojis(3);
  }
  return text;
};

const textDaysSum13 = (days) => {
  let text = '';
  const digits = toDigits(days);
  const sum = sumDigits(days);
  if(sum === 13) {
    text = `\n${days}... ${digits.join(' + ')} = 13 `;
    text += randomEmojis(3);
  }
  return text;
};

const textDayMonthSum13 = (date) => {
  let text = '';
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const dayString = `${day}`.padStart(2, 0);
  const monthString = `${month}`.padStart(2, 0);
  const sum = month + day;
  if(sum === 13) {
    text = `\nToday is ${monthString}/${dayString}... ${monthString} + ${dayString} = 13 `;
    text += randomEmojis(3);
  }
  return text;
};

const extraText = (days, date) => {
  const textEnds13 = textEndsWith13(days);
  if(textEnds13) {
    return textEnds13;
  }

  const textDayMonthSum = textDayMonthSum13(date);
  if(textDayMonthSum) {
    return textDayMonthSum;
  }

  const textDateSum = textDateSum13(date);
  if(textDateSum) {
    return textDateSum;
  }
  
  const textDaysSum = textDaysSum13(days);
  if(textDaysSum) {
    return textDaysSum;
  }

  return '';
};

const post = async (data, Twit) => {
  const { name, month, day } = data;

  // const today = new Date(new Date().setHours(0, 0, 0, 0));
  const today = new Date(new Date(2021,2,19).setHours(0, 0, 0, 0));console.log(today);

  let birthday = new Date(today.getFullYear(), month - 1, day);
  if(birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  const days = daysUntil(today, birthday);

  let tweet = '';
  if(days === 0) {
    tweet = `Today is ${name}\'s birthday`;
  } else {
    tweet = `${days} day${days !== 1 ? 's' : ''} until ${name}\'s birthday ${extraText(days, today)}`;
  }

  for (let i = 1; i < 366; i++) {
    const d = new Date(new Date().setHours(0, 0, 0, 0));
    d.setDate(d.getDate() + i);
    // console.log((d.getMonth() + 1) + '/' + d.getDate());
  }

  // const tweetResult = await Twit.post('statuses/update', { status: tweet });
  // return `Post ok: ${tweetResult.data.text}`;
  return `<div>Result: ${tweet}</div><div>today: ${today}</div><div>birthday: ${birthday}</div>`;
};

module.exports = {
  post,
  daysUntil,
  textEndsWith13,
  toDigits,
  sumDigits,
  textDateSum13,
  textDaysSum13,
  textDayMonthSum13,
  extraText,
};