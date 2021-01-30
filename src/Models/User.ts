import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
});

export default model("User", userSchema);
