import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { User as UserType } from '../../models/UserModel';
import Admin from '../../models/AdminModel';
import { Document } from 'mongoose';

interface ResObject {
  isAuthorized: boolean;
  isAdmin: boolean;
  user: UserType & Document;
  authorizeHOC: (callback: () =>
    Promise<void | NextApiResponse>) => Promise<void | NextApiResponse>;
  adminHOC: (callback: () =>
    Promise<void | NextApiResponse>) => Promise<void | NextApiResponse>;
}

export default async function authorize(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<ResObject> {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];
  let isAuthorized = false;
  let isAdmin = false;
  let user: (UserType & Document) | null = null;

  if (accessToken && process.env.ACCESS_TOKEN_SECRET) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      ) as JwtPayload;
      isAuthorized = true;
      user = await User.findOne({ username: decoded.data.user });

      if (await Admin.findOne({ user: user?._id })) {
        isAdmin = true;
      }
    } catch (error) {
      isAuthorized = false;
    }
  }

  if (user) {
    return {
      isAuthorized,
      isAdmin,
      user,
      authorizeHOC: async (callback) => {
        if (!isAuthorized) return res.status(401).end();
        return callback();
      },
      adminHOC: async (callback) => {
        if (!isAuthorized) return res.status(401).end();
        if (!isAdmin) return res.status(403).end();
        return callback();
      },
    };
  } else {
    return Promise.reject(new Error('Authorization failed'));
  }
}
