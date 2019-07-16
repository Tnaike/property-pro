import validate from 'validate.js';

const constraints = {
  first_name: {
    presence: true,
    length: {
      minimum: 3,
      message: 'length must be more that 3 characters'
    }
  },
  last_name: {
    presence: true,
    length: {
      minimum: 3,
      message: 'length must be more that 3 characters'
    }
  },
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'lenght must be at least 6 characters'
    }
  },
  confirm_password: {
    equality: {
      attribute: 'password',
      message: v => validate.format('is not the same as password', { v })
    }
  },
  phone_number: {
    presence: true,
    length: {
      minimum: 11,
      maximum: 11,
      message: 'must be at least 11 digits'
    }
  },
  address: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 5 characters'
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
