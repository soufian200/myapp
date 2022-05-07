import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var billType = new Schema({
   
  label: {
    type: String,
    required: true
  },
 
},
);


var BillType =  mongoose.models.BillType || mongoose.model('BillType', billType);

export default BillType;