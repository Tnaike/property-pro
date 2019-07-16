import validate from 'validate.js';

const constraints = {
  price: {
    presence: true,
    numericality: {
      greaterThan: 0
    }
  }
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
