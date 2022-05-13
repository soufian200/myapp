

import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../middleware/mongoose';
import Bill from '../../../models/Bill';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let results;
  results = await Bill.find().populate("client").populate("billType", "label").select("-__v");

  // check expired Traite
  results = results.map(async (bill) => {
    if (bill.billType.label === "Traite" && moment().isAfter(bill.dueDate) && bill.status !== "Impayé") {
      let r = await Bill.findByIdAndUpdate(bill._id, { status: "Impayé" }, { new: true })
      return r
    }
    return bill
  })
  results = await Promise.all(results)

  return res.status(200).json({ results })
};

export default connectDB(handler);