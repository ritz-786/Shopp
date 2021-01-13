import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const shopSchema = new Schema({
  _id: Schema.Types.ObjectId,
  shopName: {
    type: String,
  },
  shopType: {
    type: String,
    enum: [
      'grocery',
      'general',
      'stationary',
      'confectionary',
      'dispensary',
      'food',
    ],
    required: true,
  },
  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  location: {
    lat: String,
    long: String,
  },
});

const Shop = model('Shop', shopSchema);

export default Shop;
