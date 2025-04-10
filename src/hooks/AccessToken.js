import { v4 as uuidv4 } from 'uuid';

export const generateAccessToken = () => {
  return uuidv4(); // یک توکن تصادفی تولید می‌کند
};