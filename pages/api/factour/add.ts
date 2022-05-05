

import { NextApiRequest, NextApiResponse } from 'next';

import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../../middleware/mongoose';
import Factour from '../../../models/Factour';
import FactourType from '../../../models/FactourType';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 
  const uid = uuidv4();
  var client = new Factour({
    uid,
    clientId: "627421b3464dc3f33d3b29b5",
    date: "2022-05-19",
    dueDate: "2022-05-20",
    price: 10000,
    factourTypeId: "6274215f464dc3f33d3b29ad"

  });
  const result = await client.save();
  console.log(result)
  return res.status(200).json({msg: "New Factour Type Added"})
};

export default connectDB(handler);