const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
  const added_todos = await getAsync('added_todos');
  if (!added_todos) {
    setAsync('added_todos', 1);
  } else {
    setAsync('added_todos', Number(added_todos) + 1);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body;

  if (body.text === undefined) {
    return res.status(400).json({ error: 'text missing' });
  }

  req.todo.text = body.text;
  if (body.done) {
    req.todo.done = true;
  } else {
    req.todo.done = false;
  }

  req.todo.save().then((savedTodo) => {
    res.json(savedTodo);
  });
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
