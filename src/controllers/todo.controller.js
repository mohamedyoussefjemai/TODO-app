import handled404Error, {
  handled400Error,
  handled500Error,
} from '../services/handleError.service.js';
import {
  createToDo,
  findOneToDo,
  findTodoByFilter,
  removeToDo,
  updateToDo,
} from '../services/todo.service.js';

// validations
import { validateToDoInput } from '../libs/common/index.js';

// @Route   POST /api/todos
// @desc    Create a to do
// @access  Private
const create = async (req, res) => {
  try {
    // validate toDo
    const response = validateToDoInput.validate(req.body, {
      abortEarly: true,
    });
    if (response && response.error)
      return handled400Error(response.error.details[0].message, res);
    // get data
    const { user } = req;
    const { content } = response.value;

    // create toDo
    const savedTodo = await createToDo({
      user: user._id,
      content,
    });
    return res.json(savedTodo);
  } catch (err) {
    return handled500Error(err.message, res);
  }
};

// @Route   GET /api/todos/current
// @desc    current users to do
// @access  Private
const getCurrent = async (req, res) => {
  const completeToDos = await findTodoByFilter(
    {
      user: req.user._id,
      complete: true,
    },
    { completedAt: -1 }
  );
  const incompleteToDos = await findTodoByFilter(
    {
      user: req.user._id,
      complete: false,
    },
    { createdAt: -1 }
  );
  return res.json({ completeToDos, incompleteToDos });
};

// @Route   PUT /api/todos/:id/complete
// @desc    mark a to do complete
// @access  Private
const complete = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    // get toDo
    const toDo = await findOneToDo({ user: user._id, _id: id });
    if (!toDo) return handled404Error('ToDo not found', res);
    // if toDo completed
    if (toDo.complete) return handled404Error('ToDo already complete', res);
    // update toDo
    const updatedToDo = await updateToDo(
      { user: user._id, _id: id },
      { complete: true, completeAt: new Date() }
    );
    return res.json(updatedToDo);
  } catch (err) {
    return handled500Error(err.message, res);
  }
};

// @Route   PUT /api/todos/:id/incomplete
// @desc    mark a to do incomplete
// @access  Private
const incomplete = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    // get toDo
    const toDo = await findOneToDo({ user: user._id, _id: id });
    if (!toDo) return handled404Error('ToDo not found', res);
    // incomplete toDo
    const updatedToDo = await updateToDo(
      { user: user._id, _id: id },
      { complete: false, completeAt: null }
    );
    return res.json(updatedToDo);
  } catch (err) {
    return handled500Error(err.message, res);
  }
};

// @Route   PUT /api/todos/:id
// @desc    update content a to do
// @access  Private
const update = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    // get toDo
    const toDo = await findOneToDo({ user: user._id, _id: id });
    if (!toDo) return handled404Error('ToDo not found', res);
    // validate toDo data
    const response = validateToDoInput.validate(req.body, {
      abortEarly: true,
    });
    if (response && response.error)
      return handled400Error(response.error.details[0].message, res);
    // get data
    const { content } = response.value;
    // update toDo content
    const updatedToDo = await updateToDo(
      { user: user._id, _id: id },
      { content }
    );
    return res.json(updatedToDo);
  } catch (err) {
    return handled500Error(err.message, res);
  }
};

// @Route   DELETE /api/todos/:id
// @desc    delete a toDo
// @access  Private
const remove = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    // get toDo
    const toDo = await findOneToDo({ user: user._id, _id: id });
    if (!toDo) return handled404Error('ToDo not found', res);
    // delete toDo
    await removeToDo({ user: req.user._id, _id: req.params.id });
    return res.json({ success: true });
  } catch (err) {
    return handled500Error(err.message, res);
  }
};

export { create, getCurrent, complete, incomplete, update, remove };
