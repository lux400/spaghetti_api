import { User } from '../models';
import { getUserBy } from '../services/Users';

export const index = async (req, res) => {
  const users = await User.query();
  res.json(users);
};

export const show = async (req, res) => {
  const { id } = req.params;
  const users = await getUserBy('id', id);
  res.json(users);
};
