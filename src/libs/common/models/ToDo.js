import { Schema, model } from 'mongoose';

const ToDoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    completeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = model('ToDoDocument', ToDoSchema);
export default ToDo;
