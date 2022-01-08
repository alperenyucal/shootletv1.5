import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { User as UserType } from '../../models/UserModel';
import { Document } from 'mongoose';
import AdminModel from '../../models/AdminModel';

export interface ResObject {
  isAuthorized: boolean;
  isAdmin: boolean;
  user: UserType & Document;
  authorizeHOC: (callback: () =>
    Promise<void | NextApiResponse>) => Promise<void | NextApiResponse>;
  adminHOC: (callback: () =>
    Promise<void | NextApiResponse>) => Promise<void | NextApiResponse>;
}

export async function authorize(
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
      user = await User.findOne({ email: decoded.data.email });

      if (await AdminModel.findOne({ user: user?._id })) {
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
    if (!res.headersSent) {
      res.status(401).json({ message: 'Authorization failed' });
    }
    return Promise.reject(new Error('Authorization failed'));
  }
}
