

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Client from '../../../models/Client';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

  const { name } = req.body;

  var client = new Client({ name });

  await client.save();

  return res.status(200).json({ msg: "New Client Added Successfully" })
};

export default connectDB(handler);