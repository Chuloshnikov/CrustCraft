import mongoose from "mongoose";
import {User} from "@/models/User";
import { compare } from "bcryptjs";

export default async function getUser(email, password) {

    mongoose.connect(process.env.MONGODB_URL);
    const user = await User.findOne({email});
    const passwordOk = user && await compare(password, user.password);

    if (passwordOk) {
      return user;
    } else {
        throw new Error("user not found!");
    }

}