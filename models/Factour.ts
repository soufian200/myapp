import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var factour = new Schema({
  
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  date: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  
  factourTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FactourType'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
});


var Factour =  mongoose.models.Factour || mongoose.model('Factour', factour);

export default Factour;