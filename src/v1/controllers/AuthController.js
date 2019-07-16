export const users = [];

class AuthController {
  static signin(req, res) {
    const { email, password } = req.body;

    const registeredUser = users.find(
      user => user.email === email && user.password === password
    );

    if (!registeredUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid email address or password'
      });
    }

    return res
      .status(200)
      .json({
        status: 'success',
        data: { id: registeredUser.id, token: registeredUser.token }
      });
  }

  static signup(req, res) {
    const {
      email,
      first_name,
      last_name,
      password,
      phone_number,
      address,
      isAdmin
    } = req.body;

    const isExistingUser = users.find(user => user.email === email);

    if (isExistingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'Email address has already been registered'
      });
    }
    const token = Math.random();
    const id = users.length + 1;
    const user = {
      id,
      token,
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address,
      isAdmin
    };
    users.push(user);

    return res.status(201).json({
      status: 'success',
      data: {
        token: user.token,
        id: user.id,
        first_name,
        last_name,
        email: user.email
      }
    });
  }
}

export default AuthController;
