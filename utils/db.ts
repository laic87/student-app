// utils/database.js
import mongoose from "mongoose";

// DATABAS KOPPLING

// Om filen saknar länken/ är null dvs inte kopplad med database  ->
// kommer koden att sluta exekveras och generera ett fel
if (!process.env.MONGODB_URI) {
  throw new Error("No MongoDB URI specified");
}

const uri = process.env.MONGODB_URI;

export async function dbConnect(
  retryCount: number = 0
): Promise<typeof mongoose> {
  try {
    const db = await mongoose.connect(uri, {
      autoIndex: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 5000,
      family: 4, // Connecting useing IPv4
      authSource: "admin", // Specify the authentication database
      serverSelectionTimeoutMS: 30000, // Exp server selection timeout
      heartbeatFrequencyMS: 10000, // Exp heartbeat freq
    });
    console.log("CONNECTED TO DATABASE)");

    return db;
  } catch (err) {
    throw new Error(`Failed to connect to database${err}`);

    const maxRetries = 3;

    if (retryCount < maxRetries) {
      console.log(`Retrying connection... Attempt ${retryCount + 1}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return dbConnect(retryCount + 1);
    } else {
      `Max retries (${maxRetries}) reached, Unable to connect to the database`;
      throw new Error(
        "Max retries reached. Unable to connect to the database."
      );
    }
  }
}
