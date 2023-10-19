import { ToDo } from '../libs/common/index.js';

const findOneToDo = async (data) => ToDo.findOne(data);

const createToDo = async (data) => {
  const newToDo = new ToDo(data);
  return newToDo.save();
};

const findTodoByFilter = async (data, sort) => ToDo.find(data).sort(sort);

const updateToDo = async (id, data) =>
  ToDo.findByIdAndUpdate(id, data, { new: true });

const removeToDo = async (id) => ToDo.findByIdAndRemove(id);

export { createToDo, findTodoByFilter, findOneToDo, updateToDo, removeToDo };
