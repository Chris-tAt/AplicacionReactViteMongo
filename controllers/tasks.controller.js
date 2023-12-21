import Task from "../model/tasks.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(
      {
        user: req.decoded.id
      }
    ).populate('user');
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({message: "task not found"})
  }
};

export const createTask = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({message: "task not found"})
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({message: "task not found"})
  }
};

export const getTask = async (req, res) => {
 try {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
 } catch (error) {
  return res.status(404).json({message: "task not found"})
 }
};

export const updateTask = async (req, res) => {
 try {
   const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
 } catch (error) {
  return res.status(404).json({message: "task not found"})
 }
};
