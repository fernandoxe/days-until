const dayMs = 60 * 60 * 24 * 1000;

const post = async (data, Twit) => {
  const { name, month, day } = data;

  const today = new Date();

  let birthday = new Date(today.getFullYear(), month - 1, day);
  if(birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  const days = Math.round(Math.abs((today - birthday) / dayMs));

  let tweet = '';
  if(days === 0) {
    tweet = `Today is ${name}\'s birthday`;
  } else {
    tweet = `${days} day${days !== 1 ? 's' : ''} until ${name}\'s birthday`;
  }

  const tweetResult = await Twit.post('statuses/update', { status: tweet });
  return `Post ok: ${tweetResult.data.text}`;
};

module.exports = {
  post,
};