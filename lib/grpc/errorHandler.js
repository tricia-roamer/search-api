const { error } = require('./responses');

module.exports = () =>
  (fn) =>
    (req) => {
      const startAt = new Date();
      return fn(req)
        .then((res) => {
          const { msisdn } = req;
          const { status, message } = res.response || res;

          console.log(`[${new Date().toISOString()}] ${msisdn || ''} ${status} - ${message} in ${new Date() - startAt} ms`.replace(/\s{2,}/g, ' '));
          return res;
        })
        .catch((err) => {
          console.log(`[${new Date().toISOString()}] [ERROR] ${err.message}`);
          console.log(err.stack);

          return error(err.message);
        });
    };
