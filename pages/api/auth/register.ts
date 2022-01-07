import connectDB from '../../../lib/utils/middleware/mongodb';
import User from '../../../lib/models/UserModel';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

/* const reqSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .messages({
      "string.base": `"a" should be a type of 'text'`,
      "string.empty": `"a" cannot be an empty field`,
      "string.min": `"a" should have a minimum length of {#limit}`,
      "string.max": `"a" should have a maximum length of {#limit}`,
      "any.required": `"a" is a required field`,
    }),
}); */

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    const { username, password, email } = req.body;

    switch (req.method) {
      case 'POST': {
        const hashPassword = await bcrypt.hash(password, 8);

        /* await reqSchema.validateAsync({
            username,
            email,
            password,
          }); */

        const user = new User({
          username,
          email,
          password: hashPassword,
        });

        await user.save();

        res.status(200).end();

        break;
      }
      default:
        res.status(404).end();
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

export default handler;
