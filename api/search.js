// const rewardFunctions = require('./fn/rewardFunctions');
const { getPopular } = require('./fn/repositoryFunctions');

const initErrorHandler = require('../lib/grpc/errorHandler');

module.exports = () => {
  const catchErrors = initErrorHandler();

  // define gRPC functions
  const getPopularRPC = async (call, callback) => {
    const response = await catchErrors(getPopular)(call.request, 'get_partners');
    callback(null, response);
  };

  return {
    getPopular: getPopularRPC,
  };
};
