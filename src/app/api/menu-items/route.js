import { MenuItem } from "../../../models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URL);
    const data = await req.json();
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
}

export async function GET() {
    mongoose.connect(process.env.MONGODB_URL);
    return Response.json(
        await MenuItem.find()
    )
}