

import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../middleware/mongoose';
import Bill from '../../../models/Bill';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

  const results = await Bill.find().populate("client").populate("billType", "label").select("-__v");
  return res.status(200).json({ results })
};

export default connectDB(handler);