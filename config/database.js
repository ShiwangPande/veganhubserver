import mongoose from "mongoose";

export const connectDB = async () => {
   const { connection } = await mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));

   console.log(`MongoDB is connected with ${connection.host}`);
}