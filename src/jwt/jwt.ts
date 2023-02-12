import jwt from 'jsonwebtoken';

export const token = (user) => {
  return jwt.sign({ user }, process.env.TOKEN_SECRET);
};
export const ensureToken = async (auth) => {
  const Token = auth ? auth.split(' ')[1] : '';
  jwt.verify(Token, process.env.TOKEN_SECRET);
};

export const getUserIdFromToken = async (auth) => {
  const Token = auth ? auth.split(' ')[1] : '';
  const decoded: any = jwt.verify(Token, process.env.TOKEN_SECRET);
  return decoded.user.id;
};
