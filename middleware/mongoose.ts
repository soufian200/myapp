import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connectDB = (handler: any) => async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  // await mongoose.connect("mongodb://localhost:27017/mydb", );
  await mongoose.connect(process.env.MONGODB_URI as string,);

  return handler(req, res);
};

export default connectDB;