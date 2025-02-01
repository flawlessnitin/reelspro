import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;
if (!MONGODB_URL) {
  throw new Error("Mongo DB URL is not defined");
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}
export async function dbConnect() {
  if (cached.con) {
    return cached.con;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise = mongoose.connect(MONGODB_URL, opts).then(() => mongoose.connection);
  }
  try {
    cached.con = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("Error connecting to database", error);
    
  }
  return cached.con;
}
