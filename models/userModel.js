import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    gender: String,
    delivery: String,
});

export const User = mongoose.model("User", userSchema);