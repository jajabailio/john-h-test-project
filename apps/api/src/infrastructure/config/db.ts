import mongoose from "mongoose";

export const connectToDatabase = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};
