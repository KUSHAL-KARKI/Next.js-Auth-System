import mongoose from "mongoose";

let isConnected = false; // global connection state

export async function connect() {
  if (isConnected) {
    console.log("✅ Using existing DB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);

    isConnected = true;
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.log("❌ Error in DB connection:", error);
    throw error;
  }
}
