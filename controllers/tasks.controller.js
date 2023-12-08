import Task from "../model/tasks.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find(
    {
      user: req.decoded.id
    }
  ).populate('user');
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
console.log(req.decoded)

  const newTasks = new Task({
    title,
    description,
    date,
    user: req.decoded.id
  });

  const saveTasks = await newTasks.save();
  res.json(saveTasks);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204)
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};
