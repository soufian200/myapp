

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import BillType from '../../../models/BillType';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

  const results = await BillType.find().select("-__v ");
  return res.status(200).json({ results })
};

export default connectDB(handler);