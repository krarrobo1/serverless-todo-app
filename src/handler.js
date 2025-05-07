const serverless = require("serverless-http");
const express = require("express");
const app = express();

// JSON parser
app.use(express.json())

// local storage
const tasks = [
  {
    text: 'Walk the dog',
    status: 'pending'
  },
  {
    text: 'Study for the exam',
    status: 'pending'
  },
  {
    text: 'Do excercise at the park',
    status: 'pending'
  }
]

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

// Task

app.post('/task', (req, res, next) => {
  const body = req.body;
  console.log(JSON.stringify({ body }, null, 2));
  return res.status(201).json({
    message: 'Task created successfully!'
  })
});

app.get('/tasks', (req, res, next) => {
  return res.status(200).json({
    tasks
  });
});

app.get('/task/:id', (req, res, next) =>{
  const { id } = req.params;
  const current = tasks[id - 1];
  if (!current) return res.status(404).json({ message: 'Task not found' });
  return res.status(200).json({ task: current });
});

app.patch('/task/:id', (req, res, next) =>{
  const { id } = req.params;
  let current = tasks[id - 1];
  if (!current) return res.status(404).json({ message: 'Task not found' });
  const toBeUpdated = req.body;
  current = { ...current, ...toBeUpdated };
  return res.status(200).json({ task: { current } });
})

// default 
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
