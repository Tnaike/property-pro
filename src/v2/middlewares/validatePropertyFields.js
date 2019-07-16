import validate from 'validate.js';

const constraints = {

};

export default (req, res, next) => {
  const validationErrors = validate(req.body, constraints);

  if (validationErrors) {
    return res.status(400).json({
      status: 'error',
      error: validationErrors
    });
  }
  return next();
};
