import { model, Schema, Document } from 'mongoose';

interface ITopicModel extends Document{
  __v: number;
  name: string;
  avatar_url: string;
  introduction: string;
}

const topicSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  avatar_url: { type: String },
  introduction: { type: String, select: false },
});

export default model<ITopicModel>('Topic', topicSchema);
