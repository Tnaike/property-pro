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

}

export default AuthController;
