import { NextApiRequest } from 'next';

export const logger = (req: NextApiRequest) => {
  console.log(req.url);
};
