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

const extraText = (days) => {
  const digits = String(days).split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  let text = '';
  if(sum === 13) {
    text = `\n${digits.join(' + ')} = 13 `;
    text += randomValues(3, emojis).join(' ');
  }
  return text;
};

const post = async (data, Twit) => {
  const { name, month, day } = data;

  const today = new Date(new Date().setHours(0, 0, 0, 0));

  let birthday = new Date(today.getFullYear(), month - 1, day);
  if(birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  const days = daysUntil(today, birthday);

  let tweet = '';
  if(days === 0) {
    tweet = `Today is ${name}\'s birthday`;
  } else {
    tweet = `${days} day${days !== 1 ? 's' : ''} until ${name}\'s birthday ${extraText(days)}`;
  }

  const tweetResult = await Twit.post('statuses/update', { status: tweet });
  return `Post ok: ${tweetResult.data.text}`;
  // return `<div>Result: ${tweet}</div><div>today: ${today}</div><div>birthday: ${birthday}</div>`;
};

module.exports = {
  post,
};