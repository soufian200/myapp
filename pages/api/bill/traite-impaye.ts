

import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Bill from '../../../models/Bill';


const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const { id, type, dueDate } = req.body;

    let r;

    if (type === "Traite" && moment().isAfter(dueDate)) {
        r = await Bill.findByIdAndUpdate(id, { status: "Impayé" })
    }

    return res.status(200).json({ msg: "Status Traite To Impaye " })
};

export default connectDB(handler);