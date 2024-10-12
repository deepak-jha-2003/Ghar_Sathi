import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://deepakjha25112023:9631967939@cluster0.bjew5.mongodb.net/food-dev').then(()=>console.log("DB Connected"));
}