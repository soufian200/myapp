import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var client = new Schema({
   
  name: {
    type: String,
    required: true
  },
});


var Client =  mongoose.models.Client || mongoose.model('Client', client);

export default Client;