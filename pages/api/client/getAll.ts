

import { NextApiRequest, NextApiResponse } from 'next';

import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../../middleware/mongoose';
import Client from '../../../models/Client';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 

  const result = await Client.find().select("-__v");
  return res.status(200).json({ clients: result})
};

export default connectDB(handler);