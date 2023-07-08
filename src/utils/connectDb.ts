import mongoose from "mongoose";
let isConnected = false;
export const connectDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    if (isConnected) {
      console.log("MongoDB is already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URL as string);
    isConnected = true;
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
  }
};
