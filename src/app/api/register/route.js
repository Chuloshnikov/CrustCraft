import {User} from "@/models/User";
import mongoose from "mongoose";
import { hash } from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGODB_URL);
  if (!body.password?.length || body.password.length < 5) {
    new Error('password must be at least 5 characters');
  }

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}