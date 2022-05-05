

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import FactourType from '../../../models/FactourType';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 
  
  const label = "Traite"
  var client = new FactourType({
    label
  });
  const result = await client.save();
  console.log(result)
  return res.status(200).json({msg: "New Factour Type Added"})
};

export default connectDB(handler);