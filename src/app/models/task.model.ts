import { ObjectId } from "./object-id.model"

export type Task = {
  _id: ObjectId;
  title: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
