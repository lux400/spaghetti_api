import { User } from '../models';
import { getUserBy } from '../services/Users';

export const index = async (req, res) => {
  const users = await User.query();
  res.json(users);
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await getUserBy('id', id);
  console.log(user);
  res.json(user);
};
