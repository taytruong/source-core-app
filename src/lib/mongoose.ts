"use server";

import mongoose from "mongoose";

// singelton connection :  check đã connect chưa ? nếu có MONGODB_URL is already connected
let isConnected: boolean = false;
export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }
  if (isConnected) {
    console.log("MONGODB_URL is already connected");
    return;
  }

  // nếu chưa connect thì chạy try/catch để connect đến DB
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "course_apps",
    });
    isConnected = true;
  } catch (error) {
    console.log("Error while connecting to database");
  }
};
