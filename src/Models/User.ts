import { model, Schema, Document, Types } from 'mongoose';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

enum Diploma {
  SENIOR = 1,
  JUNIOR,
  REGULAR,
  MASTER,
  DOCTOR,
}

interface IEmployment {
  company: string;
  job: string;
}

interface IEducation {
  school: string;
  major: string;
  diploma: Diploma;
  entrance_year: number;
  graduation_year: number;
}

export interface IUserModel extends Document {
  name: string;
  password: string;
  avatar_url: string;
  gender: Gender;
  headline: string;
  locations: [string];
  employments: [IEmployment];
  educations: [IEducation];
  following: [ Types.ObjectId ];
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
  locations: { type: [{ type: String }], select: false },
  business: { type: String, select: false },
  employments: {
    type: [
      {
        company: { type: String },
        job: { type: String },
      },
    ],
    select: false,
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
    select: false,
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false,
  },
});

export default model<IUserModel>('User', userSchema);
