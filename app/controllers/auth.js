import * as Accounts from '../services/Accounts';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Accounts.getUserBy('email', email);

    await Accounts.validatePassword(password, user.passwordHash);

    req.session.user = {
      id: user.id,
      type: user.type,
    };

    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(401).json({ success: false });
  }
};

export const logout = (req, res) => {
  req.session.user = undefined;
  res.json({ success: true });
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Accounts.getUserBy('email', email);

    await Accounts.sendResetPasswordLinkTo({
      origin: req.headers.origin,
      user,
    });

    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(422).json({ success: false });
  }
};

export const resetPasswordConfirmed = async (req, res) => {
  try {
    const { confirmationCode } = req.params;
    const { password } = req.body;

    const user = await Accounts.getUserBy('confirmation_code', confirmationCode);

    await Accounts.resetUserPassword(user, { password });

    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(422).json({ success: false });
  }
};

export const signup = async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const existingUser = await Accounts.getUserBy('email', email).select('id');

    if (existingUser) {
      res.status(412).json({ success: false });
    } else {
      const createdUser = await Accounts.createUser({
        origin: req.headers.origin,
        userData: req.body,
      });
      res.json(createdUser);
    }
  } catch (e) {
    console.log(e);
    res.status(422).json({ success: false });
  }
};

export const requireLogin = () => async (req, res, next) => {
  const { user } = req.session;

  if (user) {
    req.user = await Accounts.getUserBy('id', user.id);
    return next();
  }

  return res.status(401).json({ message: 'not logged in' });
};

export const requireBelonging = (itemPromise, lookupPlace = 'params') => async (req, res, next) => {
  const { id } = req[lookupPlace];
  const item = await itemPromise(id);

  const belongs = item.userId === req.user.id;

  if (belongs) {
    next();
  } else {
    res.status(401).json({ message: 'not logged in' });
  }
};
