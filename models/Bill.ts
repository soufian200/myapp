import mongoose from 'mongoose';
import BillType from './BillType';
import Client from './Client';
var Schema = mongoose.Schema;

var bill = new Schema({

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Client
  },
  dueDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "encours"
  },
  billType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BillType
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },

});


var Bill = mongoose.models.Bill || mongoose.model('Bill', bill);

export default Bill;