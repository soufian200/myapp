

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Client from '../../../models/Client';
import FactourType from '../../../models/FactourType';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 

//   var client = new Client();
  
  const result = await FactourType.find().select("-__v ");
  console.log(result)
  return res.status(200).json({ factourType: result})
};

export default connectDB(handler);