import express from 'express';
import mongoose from 'mongoose';

import findIndex from 'lodash/findIndex';
import dropWhile from 'lodash/dropWhile';
import Product from '../../models/product';
import Shop from '../../models/shop';

const router = express.Router();

/**
 * To get the shop_id in which
 * the product is to be added
 * fetch all shop details of the seller,
 * and send request to the following apis
 * for the concerned work
 */

router.get('/', (req, res) => {
  res.send('Welcome to the Product Section');
});

router.post('/addToShop', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const id = req.body.shopId;
    const shop = await Shop.findById(id).session(session).exec();
    if (shop === null) {
      session.abortTransaction();
      res.status(400).json({
        message: 'Shop not found',
        success: 0,
      });
    } else {
      let product;
      product = await Product.findOne({
        name: req.body.productName,
        cost: req.body.cost,
        productType: req.body.productType,
      });
      if (product) {
        product.$session(session);
        shop.$session(session);
        shop.products.push({
          _id: product._id,
          quantity: req.body.quantity,
        });
        product.shop.push(shop._id);
        await product.save();
      } else {
        product = new Product({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.productName.toString().toLowerCase(),
          productType: req.body.productType,
          cost: req.body.cost,
          shop: req.body.shopId,
        });
        shop.$session(session);
        product.$session(session);
        const result = await product.save();
        shop.products.push({
          _id: result._doc._id,
          quantity: req.body.quantity,
        });
      }
      await shop.save();
      await session.commitTransaction();
      res.json({
        message: 'Product Saved',
        product,
        success: 1,
      });
    }
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({
      path: 'product',
      message: `Not inserted ${err.message}`,
      success: 0,
    });
  }
});

router.post('/shopDetails', async (req, res) => {
  try {
    const shop = await Shop.findById(req.body.shopId).populate(
      'products._id',
      '_id name productType cost',
    );
    if (shop === null) {
      res.status(400).json({
        path: 'product',
        message: 'Shop not found',
        success: 1,
      });
    } else {
      res.send(shop);
    }
  } catch (err) {
    res.status(500).json({
      path: 'shop',
      message: err.message,
      success: 0,
    });
  }
});

router.patch('/updateProductQuantity', async (req, res) => {
  try {
    const shop = await Shop.findById(req.body.shopId)
      .select('products')
      .populate('products._id')
      .exec();
    if (shop === null) {
      res.status(400).json({
        path: 'product',
        message: 'Shop not found',
        success: 1,
      });
    } else {
      const index = findIndex(
        shop.products,
        (product) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          product._id._id.toString() === req.body.productId.toString(),
      );
      shop.products[index].quantity = req.body.quantity;
      await shop.save();
      res.status(200).json(shop.products[index]);
    }
  } catch (err) {
    res.status(500).json({
      path: 'product',
      message: err.message,
      success: 0,
    });
  }
});

router.delete('/deleteProduct', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const shop = await Shop.findById(req.body.shopId)
      .select('products')
      .populate('products._id')
      .exec();

    if (shop === null) {
      session.abortTransaction();
      res.status(400).json({
        path: 'product',
        message: 'Shop not found',
        success: 1,
      });
    } else {
      const product = await Product.findOne({ _id: req.body.productId }).exec();
      shop.$session(session);
      product.$session(session);
      product.shop = product.shop.filter(
        (s) => s.toString() !== req.body.shopId.toString(),
      );
      shop.products = dropWhile(
        shop.products,
        (_product) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          _product._id._id.toString() === req.body.productId.toString(),
      );

      await shop.save();
      await product.save();
      session.commitTransaction();
      res.status(200).json(shop);
    }
  } catch (err) {
    session.abortTransaction();
    res.status(500).json({
      path: 'product',
      message: err.message,
      success: 0,
    });
  }
});

export default router;
