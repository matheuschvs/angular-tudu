import { ObjectId } from "./object-id.model";

export type Category = {
  _id: ObjectId;
  title: string;
  color: string;
  created_at: Date;
  updated_at: Date;
}
