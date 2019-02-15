import * as Accounts from '../services/Accounts';
import { requireLogin } from './auth';

export const middleware = {
  index: [requireLogin()],
  create: [requireLogin()],
};

export const index = (req, res) => {
  res.json(req.user);
};

export const create = async (req, res) => {
  try {
    if (req.body.newPassword) {
      await Accounts.validatePassword(req.body.currentPassword, req.user.passwordHash);
    }

    const user = await Accounts.prepareUserForUpdate(req.body);
    const updatedUser = await Accounts.updateUser(req.user.id, user);

    if (req.body.newPassword) {
      await Accounts.logoutUserEverywhere(updatedUser);
    }

    res.json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(422).json({ success: false });
  }
};
