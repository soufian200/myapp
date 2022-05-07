

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Bill from '../../../models/Bill';


const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

  const { client, dueDate, price, type } = req.body;
  const data = {
    client: client.value,
    dueDate,
    price,
    billType: type.value
  }

  var clientOb = new Bill(data);
  await clientOb.save();
  return res.status(200).json({ msg: "New Bill Added successfully" })
};

export default connectDB(handler);