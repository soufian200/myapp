

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/mongoose';
import User from '../../models/User';

const handler = async (req:NextApiRequest, res: NextApiResponse<any>) => {
//   if (req.method === 'POST') {
    // Check if name, email or password is provided
    // const { name, email, password } = req.body;
    const name = "name1"
    const email = "email1"
    const password = "password1"
    if (name && email && password) {
        try {
          // Hash password to store it in DB
        //   var passwordhash = await bcrypt.sign(password);
          var user = new User({
            name,
            email,
            password: "1223",
          });
          // Create new user
          var usercreated = await user.save();
          return res.status(200).send(usercreated);
        } catch (error ) {
          return res.status(500).send({msg:(error as Error).message});
        }
      } else {
        res.status(422).send('data_incomplete');
      }
//   } else {
//     res.status(422).send('req_method_not_supported');
//   }
};

export default connectDB(handler);