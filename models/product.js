import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  productType: {
    type: String,
    enum: ['veggies', 'stationary', 'confectionary', 'dispensary', 'food'],
  },
  cost: {
    type: Number,
    min: 0,
    required: true,
  },
  shop: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
  ],
});

const Product = model('Product', productSchema);

export default Product;
