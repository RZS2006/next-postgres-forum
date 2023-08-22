import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]/route';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req.body);
    // const session = await getServerSession(req, res, authOptions);

    // if (!session) {
    //   return res
    //     .status(401)
    //     .json({ message: 'You must sign in to create a post.' });
    // }

    // console.log(req.body);
  }
}
