import validate from 'validate.js';

const constraints = {
  title: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 5 characters'
    }
  },
  price: {
    presence: true,
    numericality: {
      greaterThan: 0
    }
  },
  city: {
    presence: {
      message: 'is required'
    }
  },
  state: {
    presence: true
  },
  type: {
    presence: {
      message: 'is required'
    }
  },
  image_url: {
    presence: true
  },
  description: {
    presence: true
  },
  bathroom: {
    presence: true,
    numericality: {
      greaterThan: 0,
      lessThan: 6
    }
  },
  bedroom: {
    presence: true,
    numericality: {
      greaterThan: 0,
      lessThan: 6
    }
  }
};

export default (req, res, next) => {
  const validationErrors = validate(req.body, constraints);

  if (validationErrors) {
    return res.status(400).json({
      status: 'error',
      message: validationErrors
    });
  }
  return next();
};
