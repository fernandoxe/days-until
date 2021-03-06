const dayMs = 60 * 60 * 24 * 1000;

const daysUntil = (today, date) => {
  return Math.round(Math.abs((today - date) / dayMs));
};

const emojis = [
  '๐',
  '๐คจ',
  '๐ถ',
  '๐',
  '๐ตโ๐ซ',
  '๐คฏ',
  '๐ณ',
  '๐ฏ',
  '๐ฎ',
  '๐ฑ',
  '๐',
  '๐คก',
  '๐',
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
  const digits = toDigits(number);
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

const text13th = (date) => {
  return (date.getMonth() + 1 !== 12) && date.getDate() === 13 ? '\nHappy 13th!': '';
};

const textBirthday = (days, name) => {
  return days === 0 ? `Today is ${name}\'s birthday!` : '';
};

const textDaysUntil = (days, name) => {
  return `${days} day${days !== 1 ? 's' : ''} until ${name}\'s birthday`;
};

const getToday = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};

const getNextBirthday = (today, month, day) => {
  let birthday = new Date(today.getFullYear(), month - 1, day);
  if(birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }
  return birthday;
};

const post = async (data, Twit) => {
  const { name, month, day } = data;

  const today = getToday();

  const birthday = getNextBirthday(today, month, day);

  const days = daysUntil(today, birthday);

  const textBday = textBirthday(days, name);

  let tweet = '';

  if(textBday) {
    tweet = textBday;
  } else {
    tweet = `${textDaysUntil(days, name)}${extraText(days, today)}${text13th(today)}`;
  }

  // for (let i = 1; i < 366; i++) {
  //   const d = new Date(new Date().setHours(0, 0, 0, 0));
  //   d.setDate(d.getDate() + i);
  //   if(birthday < d) {
  //     birthday.setFullYear(birthday.getFullYear() + 1);
  //   }
  //   const daysU = daysUntil(d, birthday);
  //   console.log(
  //     (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(),
  //     `[${daysU}]`,
  //     `[${textDayMonthSum13(d).substr(1, 11)}]`,
  //     `[${textDateSum13(d).substr(1, 11)}]`,
  //     `[${textDaysSum13(daysU).substr(1, 11)}]`,
  //     `[${text13th(d).substr(1, 11)}]`,
  //   );
  // }

  const tweetResult = await Twit.post('statuses/update', { status: tweet });
  return `Post ok: ${tweetResult.data.text}`;
  // return `<div>Result: ${tweet}</div><div>today: ${today}</div><div>birthday: ${birthday}</div>`;
};

const replyTo = async (id, reply, Twit) => {
  const tweet = reply.replace(/\\n/g, '\n');
  const tweetResult = await Twit.post('statuses/update', {
    in_reply_to_status_id: id,
    status: tweet,
  });
  return `Post ok: ${tweetResult.data.text}`;
  // return `<div>Id: ${id}</div><div>reply: ${reply}</div>`;
};

const customTweet = async (tweet, Twit) => {
  const tw = tweet.replace(/\\n/g, '\n');
  const tweetResult = await Twit.post('statuses/update', {
    status: tw,
  });
  return `Post ok: ${tweetResult.data.text}`;
  // return `<div>Id: ${id}</div><div>reply: ${reply}</div>`;
};

module.exports = {
  post,
  replyTo,
  customTweet,
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
};
