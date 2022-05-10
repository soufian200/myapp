import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Bill from '../../../models/Bill';
import Client from '../../../models/Client';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const { id, name } = req.body;

    const data = await Bill.find({ client: id })
    if (data.length > 0) {
        return res.status(400).json({ msg: `You cannot delete this client because it's associated with a bill` })
    }

    await Client.findByIdAndRemove(id)

    return res.status(200).json({ msg: `"${name}" Deleted Successfully` })
};

export default connectDB(handler);