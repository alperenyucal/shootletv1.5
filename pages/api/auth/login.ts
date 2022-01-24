import UserModel from '../../../lib/models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiHandler } from 'next';
import { connectDB, logger } from '../../../lib/utils/middleware';


const handler: NextApiHandler = async (req, res) => {
  try {
    logger(req);
    await connectDB();

    const { email, password } = req.body;

    switch (req.method) {
      case 'POST': {
        const user = await UserModel.findOne({ email });
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          const accessToken = jwt.sign(
            { data: { email: user.email } },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: 60 * 5 }, // 5 minutes
          );
          const refreshToken = jwt.sign(
            { data: { email: user.email } },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: 60 * 60 * 24 * 30 * 6 }, // 6 months
          );

          if (isValid) {
            res.status(200).json({
              user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                avatar: user.avatar,
                city: user.city,
                country: user.country,
              },
              accessToken,
              refreshToken,
            });
          }
        } else res.status(400).json({ message: 'Wrong credentials!' });

        break;
      }
      default:
        res.status(404).end();
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).json({ message: error });
    }
  }
};

export default handler;
