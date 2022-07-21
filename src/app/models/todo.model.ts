import { Category } from "./category.model";
import { Comment } from "./comment.model";
import { ObjectId } from "./object-id.model"
import { Task } from "./task.model";
import { User } from "./user.model";

export type Todo = {
  _id: ObjectId;
  title: string;
  description: string;
  deadline: Date;
  status: string;
  percent?: string;
  category: Category;
  members: User[];
  files: any[];
  tasks: Task[];
  comments: Comment[];
}
