import { model, Schema, Document } from 'mongoose';

export interface IUserModel extends Document {
  name: string;
  password: string;
  avatar_url: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  __v: { type: Number, select: false },
  avatar_url: { type: String },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
    required: true,
  },
  headline: { type: String },
  locations: { type: [{ type: String }] },
  business: { type: String },
  employments: {
    type: [
      {
        company: { type: String },
        job: { type: String },
      },
    ],
  },
  educations: {
    type: [
      {
        school: { type: String },
        major: { type: String },
        diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
        entrance_year: { type: Number },
        graduation_year: { type: Number },
      },
    ],
  },
});

export default model<IUserModel>('User', userSchema);
