import mongoose from "mongoose";

//Mongoose connect method's returns a promise!
const connectDB = (url)=>{

    return mongoose.connect(url)

}

export default connectDB;