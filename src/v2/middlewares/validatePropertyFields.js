import validate from 'validate.js';

const constraints = {
  title: {
    presence: true,
    length: {
      minimum: 1,
      message: 'must be at least 1 characters'
    }
  },
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
