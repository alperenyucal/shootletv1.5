import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB, logger } from '../../../lib/utils/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    logger(req);
    await connectDB();

    const { accessToken, refreshToken } = req.body;
    switch (req.method) {
      case 'POST': {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

        const decoded =
          jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET as string,
            { ignoreExpiration: true }) as JwtPayload;

        const newAccessToken = jwt.sign(
          { data: decoded.data },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: 60 * 5 }, // 5 minutes
        );
        const newRefreshToken = jwt.sign(
          { data: decoded.data },
          process.env.REFRESH_TOKEN_SECRET as string,
          { expiresIn: 60 * 60 * 24 * 30 * 6 }, // 6 months
        );

        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

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
}

export default handler;
