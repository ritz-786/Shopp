import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const buyerSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

const Buyer = model('Buyer', buyerSchema);

export default Buyer;
