import mongoose from "mongoose";

const connectDB=async()=>{
    await mongoose.connect(`${process.env.MONGODB_URL}/prescripto`)
    .then(()=>{console.log('DB connected')});
}

export default connectDB;