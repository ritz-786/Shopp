/* eslint-disable no-underscore-dangle */
import express from 'express';
import mongoose from 'mongoose';

import Seller from '../../models/seller';
import Shop from '../../models/shop';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Seller Section');
});

router.post('/registration', async (req, res) => {
  try {
    const checkSeller = await Seller.findOne({ contact: req.body.contact });
    if (checkSeller !== null) {
      res.status(400).json({
        message: 'Seller already present',
        success: 0,
      });
    } else {
      const seller = new Seller({
        _id: new mongoose.Types.ObjectId(),
        ownerName: req.body.ownerName,
        contact: req.body.contact,
      });
      const result = await seller.save();
      res.status(200).json({
        message: 'Seller Created Successfully',
        createdSeller: {
          ...result._doc,
        },
        success: 1,
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({
      error: err,
      success: 0,
    });
  }
});

router.post('/addShop', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const seller = await Seller.findOne({ contact: req.body.contact })
      .session(session)
      .exec();
    if (seller === null) {
      await session.abortTransaction();
      res.status(404).json({
        message: 'Seller not found',
        success: 0,
      });
    } else {
      const shop = new Shop({
        _id: new mongoose.Types.ObjectId(),
        shopName: req.body.shopName,
        shopType: req.body.shopType,
        address: req.body.address,
      });
      shop.$session(session);
      seller.$session(session);
      const result = await shop.save();
      seller.shops.push(result._id);
      await seller.save();
      await session.commitTransaction();
      res.status(200).json({
        message: 'Shop created Successfully',
        shopCreated: result,
        success: 1,
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    await session.abortTransaction();
    res.status(500).json({
      path: 'Shop',
      message: err.message,
      success: 0,
    });
  }
});

router.post('/details', async (req, res) => {
  const seller = await Seller.findOne({
    contact: req.body.contact,
  })
    .select('shops')
    .populate('shops')
    .exec();
  if (seller === null) {
    res.status(404).json({
      message: 'Seller not found',
      success: 0,
    });
  } else {
    res.status(200).json({
      shops: seller.shops,
      success: 1,
    });
  }
});

export default router;
