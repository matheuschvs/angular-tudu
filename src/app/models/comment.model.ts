import { ObjectId } from "./object-id.model";

export type Comment = {
  _id: ObjectId
  user: string
  comment: string
  created_at: Date;
  updated_at: Date;
}
