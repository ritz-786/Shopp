import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sellerSchema = Schema({
  _id: Schema.Types.ObjectId,
  ownerName: {
    type: String,
    required: true,
  },
  shops: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
  ],
  contact: {
    type: String,
    required: true,
  },
});

const Seller = model('Seller', sellerSchema);

export default Seller;
