

import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Bill from '../../../models/Bill';


const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const { id, type, dueDate } = req.body;

    let r;

    if (type === "Traite" && moment().isAfter(dueDate)) {
        r = await Bill.findByIdAndUpdate(id, { status: "Impayé" })
    } else {

        r = await Bill.findByIdAndUpdate(id, { status: type === "Cheque" ? "Encaisser" : "Paye" })
    }

    return res.status(200).json({ msg: "Status Updated successfully" })
};

export default connectDB(handler);