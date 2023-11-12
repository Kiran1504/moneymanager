import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    try {
        const connInstance = await mongoose.connect(`${process.env.DB}/${DB_NAME}`)
        console.log(`\nMongoDB connected !!! DB HOST: ${connInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection ERRR !!! ",error);
        process.exit(1)
    }
}

export default connectDB