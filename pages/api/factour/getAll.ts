

import { NextApiRequest, NextApiResponse } from 'next';

import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../../middleware/mongoose';
import Factour from '../../../models/Factour';
import FactourType from '../../../models/FactourType';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 
  const result = await Factour.find().populate("clientId","name").populate("factourTypeId","label").select("-__v -_id");
  console.log(result)
  return res.status(200).json({ factours: result})
};

export default connectDB(handler);