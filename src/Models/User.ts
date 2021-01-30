import { model, Schema, Document } from 'mongoose';

export interface IUserModel extends Document {
  name: string;
  password: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  __v: { type: Number, select: false },
});

export default model<IUserModel>('User', userSchema);
