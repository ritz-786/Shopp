import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = Schema(
  {
    _id: Schema.Types.ObjectId,
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    orderedItem: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

const Order = model('Order', orderSchema);

export default Order;
