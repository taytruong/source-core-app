import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }

  // 👇 cách chuẩn của mongoose
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    console.log("Connecting...");

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "course_apps",
    });

    console.log("✅ Connected");
  } catch (error) {
    console.error("❌ Error while connecting to database", error);
    throw error; // 👈 rất quan trọng
  }
};