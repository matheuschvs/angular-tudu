import { Category } from "./category.model";
import { ObjectId } from "./object-id.model";

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password_digest: string;
  created_at: Date;
  updated_at: Date;
  categories?: Category[];
}
