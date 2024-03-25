import mongoose from "mongoose";
import { Order } from "../../../models/Order";
import {MenuItem} from "../../../models/MenuItem";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URL);

    const {cartProducts, address} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;


    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false,
    });

    const stripeLineItems = [];
    for (const cartProduct of cartProducts) {
  
      const productInfo = await MenuItem.findById(cartProduct._id);
  
      let productPrice = productInfo.basePrice;
      if (cartProduct.size) {
        const size = productInfo.sizes
          .find(size => size._id.toString() === cartProduct.size._id.toString());
        productPrice += size.price;
      }
      if (cartProduct.extras?.length > 0) {
        for (const cartProductExtra of cartProduct.extras) {
          const productExtras = productInfo.extraIngredientPrices;
          const extraInfo = productExtras
            .find(extra => extra._id.toString() === cartProductExtra._id.toString());
          productPrice += extraInfo.price;
        }
      }
  
      const productName = cartProduct.name;
  
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: productName,
          },
          unit_amount: productPrice * 100,
        },
      });
    }

    console.log(stripeLineItems);



    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'order/'+ orderDoc._id.toString(),
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId: orderDoc._id.toString()},
        payment_intent_data: {
          metadata: {orderId: orderDoc._id.toString()},
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount: 400, currency: 'USD'},
                },
            }
        ],
    });
    
    return Response.json(stripeSession.url);
}