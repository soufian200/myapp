

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mongoose';
import Client from '../../../models/Client';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
 
  const names = ["A","B","C"];
  names.forEach(async(name)=>{
    
    var client = new Client({
        name: `Client ${name}`
    });
  
    await client.save();
   
  })
 
  return res.status(200).json({msg: "New Client Added"})
};

export default connectDB(handler);