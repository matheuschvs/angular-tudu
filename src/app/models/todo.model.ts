import { Category } from "./category.model";
import { ObjectId } from "./object-id.model"
import { Task } from "./task.model";

export type Todo = {
  _id: ObjectId;
  title: string;
  description: string;
  status: string;
  percent?: string;
  category: Category;
  tasks: Task[];
}
