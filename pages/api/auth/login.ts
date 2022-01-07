import connectDB from '../../../lib/utils/middleware/mongodb';
import User from '../../../lib/models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { NextApiHandler } from 'next';

const reqSchema = z.object({
  username: z.string().min(5).max(20).nonempty(),
  password: z.string()
    .regex(/^[a-zA-Z0-9_*.!@#$%^&(){}[]:;<>,.?\/~+-=|]*$/)
    .min(8)
    .max(30)
    .nonempty(),
});

const handler: NextApiHandler = async (req, res) => {
  await connectDB();

  try {
    const { username, password } = req.body;

    switch (req.method) {
      case 'POST': {
        await reqSchema.parseAsync({
          username,
          password,
        });

        const user = await User.findOne({ username });
        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          const accessToken = jwt.sign(
            { data: { user: username } },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: 60 * 5 }, // 5 minutes
          );
          const refreshToken = jwt.sign(
            { data: { user: username } },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: 60 * 60 * 24 * 30 * 6 }, // 6 months
          );

          if (isValid) {
            res.status(200).json({
              user: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                avatar: user.avatar,
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
    res.status(400).json({ error });
  }
};

export default handler;
