import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Bill from '../../../models/Bill';


const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const { id } = req.body;


    await Bill.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Deleted successfully" })
};

export default connectDB(handler);