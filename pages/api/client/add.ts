

import { NextApiRequest, NextApiResponse } from 'next';

import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../../middleware/mongoose';
import Client from '../../../models/Client';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 
  const uid = uuidv4();
  const name = "Client C"
  var client = new Client({
    uid,
    name
  });
  const result = await client.save();
  console.log(result)
  return res.status(200).json({msg: "New Client Added"})
};

export default connectDB(handler);