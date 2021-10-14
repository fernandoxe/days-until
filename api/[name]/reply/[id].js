const data = require('../../../data');
const config = require('../../../.config');
const Twit = require('twit');
const { replyTo } = require('../../../src/tweet');

const T = new Twit({
  consumer_key: config.taylor.consumer_key,
  consumer_secret: config.taylor.consumer_secret,
  access_token: config.taylor.access_token,
  access_token_secret: config.taylor.access_token_secret,
});

module.exports = async (req, res) => {
  const { name, id, tweet } = req.query;
  try {
    const dataName = data[name];
    if(!dataName) throw Error('Name doesn\'t exist');
    const response = await replyTo(id, tweet, T);
    res.status(200).send(response);
  } catch(error) {
    res.status(500).send(`Error: ${error.message} (${error.code})`);
  }
};
