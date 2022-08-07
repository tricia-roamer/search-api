const Joi = require('joi').extend(require('@joi/date'));

const initValidator = require('./_validate');
const { success, invalid, badRequest } = require('../../lib/grpc/responses');
const { getRepositories } = require('../http/getRepositories');
const { transform } = require('./transformFunctions');

// validations
const getPopularSchema = Joi.object().keys({
  count: Joi.number().optional().valid(10, 50, 100),
  startAt: Joi.date().format('YYYY-MM-DD').required(),
  language: Joi.string().optional(),
});

const validateGetPopular = initValidator({ schema: getPopularSchema });

// functions
exports.getPopular = async (req) => {
  const message = validateGetPopular(req);
  if (message) { return invalid(message); }

  // STEP 1: fetch data from endpoint
  const data = await getRepositories(req);

  // STEP 2: check if data is returned
  if (!data || !data?.items) {
    return badRequest('unable to find popular repositories for provided paramaters');
  }

  // STEP 3: normalize data and return
  const transformedItems = transform(data.items);

  return {
    items: transformedItems,
    ...success('ok'),
  };
};
