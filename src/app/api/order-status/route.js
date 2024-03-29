import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import { Order } from "../../../models/Order";
import mongoose from "mongoose";


export async function PUT(req) {
    mongoose.connect(process.env.MONGODB_URL);
    if (await isAdmin()) {
        const {_id, orderStatus } = await req.json();
        await Order.updateOne({_id}, {orderStatus});
    }
    
    return Response.json(true);
}