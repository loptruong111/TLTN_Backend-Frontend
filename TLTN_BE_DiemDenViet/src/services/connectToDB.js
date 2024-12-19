import mongoose from "mongoose";
import envVar from "../utils/envVariable.js";

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }
  try {
    await mongoose.connect(envVar.mongoUri);
    isConnected = true;
    console.log("=> Creating new database connection.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

export default connectToDatabase;
