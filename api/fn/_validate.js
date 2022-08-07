module.exports = ({ schema }) => {
  const joiError = (obj) =>
    schema.validate(obj, { allowUnknown: true, abortEarly: false }).error;

  return (req) =>
    (joiError(req) || { details: [] })
      .details.map((err) => err.message).join(', ').replace(/"/g, "'");
};
