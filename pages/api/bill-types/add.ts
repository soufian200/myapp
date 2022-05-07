

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import BillType from '../../../models/BillType';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 
  
  const labels = ["Traite","Cheque"];
  labels.forEach(async(label)=>{
  var billType = new BillType({
    label
  });
  await billType.save();
})
  return res.status(200).json({msg: "New Bill Type Added"})
};

export default connectDB(handler);