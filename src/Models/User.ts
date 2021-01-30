import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  __v: { type: Number, select: false },
});

export default model('User', userSchema);
