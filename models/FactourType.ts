import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var factourType = new Schema({
   
  label: {
    type: String,
    required: true
  },
 
},
);


var FactourType =  mongoose.models.FactourType || mongoose.model('FactourType', factourType);

export default FactourType;