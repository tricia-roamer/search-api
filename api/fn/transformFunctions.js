const { DateTime } = require('luxon');

const { APP_TIMEZONE } = process.env;

exports.transform = (items) => items.map((obj) => ({
  createdAt: DateTime.fromISO(obj.created_at, { zone: APP_TIMEZONE }).toFormat('yyyy-LL-dd hh:mm'),
  name: obj.name,
  url: obj.html_url,
  language: obj.language,
}));
