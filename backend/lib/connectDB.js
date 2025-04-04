import mongoose from "mongoose";
import configarations from "../utils/dotEnvProcess.js";


const connectDB = async() => {
  try {
    const conn = await mongoose.connect(configarations.MONGO_URI);
    console.log('MongoDV connected:' + conn.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
 
}

export default connectDB;