/* eslint-disable no-underscore-dangle */
import express from 'express';
import mongoose from 'mongoose';

import Buyer from '../../models/buyer';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Welcome to buyer Section');
});

// {
//   "name": "Ritik",
//     "contact": "+917992346220",
//       "address": "Room-D303 Hostel-k"
// }

router.post('/add', async (req, res) => {
  try {
    const checkBuyer = await Buyer.findOne({
      contact: req.body.contact,
    }).exec();
    if (checkBuyer !== null) {
      res.status(400).json({
        message: 'Buyer already present',
        success: 0,
      });
    } else {
      const buyer = new Buyer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address,
      });

      const result = await buyer.save();
      res.status(200).json({
        message: 'Created User Successfully',
        createdUser: {
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

// {
//     "name": "Lucifer",
//     "contact": "+917992346220",
//     "address": "Room-D301 Hostel-K"
// }

router.patch('/update', async (req, res) => {
  try {
    const updateOps = req.body;
    const result = await Buyer.findOneAndUpdate(
      { contact: updateOps.contact },
      { $set: updateOps },
    ).exec();
    if (result !== null) {
      res.status(200).json({
        message: "Buyer's Profile Updated Successfully",
        success: 1,
      });
    } else {
      res.status(404).json({
        message: 'Profile not found',
        success: 0,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: 0,
    });
  }
});

router.post('/find', async (req, res) => {
  try {
    const result = await Buyer.findOne({ contact: req.body.contact }).exec();
    if (result === null) {
      res.status(400).json({
        message: 'Buyer not found',
        success: 0,
      });
    } else {
      res.status(200).json({
        ...result._doc,
        success: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      success: 0,
    });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const result = await Buyer.deleteOne({ contact: req.body.contact }).exec();
    if (result.deletedCount === 0) {
      res.status(404).json({
        message: 'No such user is present',
        success: 0,
      });
    } else {
      res.status(200).json({
        message: 'Buyer Deleted',
        success: 1,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: 0,
    });
  }
});
export default router;
