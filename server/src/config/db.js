import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL || "");
    console.log("Successfully connected to MongoDB database.");
  } catch (error) {
    console.log("Error connecting to MongoDB database.", error);
  }
};
export default connectDB;
