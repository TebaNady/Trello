import { json } from "express";
import taskModel from "../../db/task.model.js";
import jwt from "jsonwebtoken";
//======================addTask==========================
const addTask = async (req, res) => {
    try {
    let { id } = req.params;
    let {title, taskContent, status, assignTo, deadline, userId} = req.body;
    //let {token} = req.headers
    //let decoded = jwt.verify(token, "gzr");
        let addedTask =  await taskModel.insertMany({title, taskContent, receivedId:id, status, assignTo, deadline, userId});
        res.status(201).json({message: "added", addedTask});
        
    }catch(error) {
        res.status(400).json({message: "invalid token", error})
    }
};

//============================getAllTasks======================
const getTasks = async (reg, res) => {
    let getAllTasks = await taskModel.find().populate('receivedId');
    res.json({message: "Hi", getAllTasks})
};

//=======================upDateTask===============================
// const upDateTask = async(req, res) => {
//     try {
//         const {title, taskContent, status} = req.body;
//         const id = req.params.id 
//         const upDate = await taskModel.findByIdAndUpdate(id, {
//             title, taskContent, status
//         }, {new: true})
//         if(upDate) {
//             res.status(200).send(upDate)
//         }else{
//             res.status(400).send("task not updated")
//         }
//     }catch(error) {
//         res.status(500).json({ error: error.message });
//     }
// }
const upDateTask = async (req, res) => {
    try {
      const { title, taskContent, status } = req.body;
      const id = req.params.id;
  
      // Validate the input data
      if (!title || !taskContent || !status) {
        return res.status(400).json({ message: "Title, taskContent, and status are required fields." });
      }
  
      const upDate = await taskModel.findByIdAndUpdate(id, {
        title,
        taskContent,
        status,
      }, { new: true });
  
      if (upDate) {
        res.status(200).json({message: "updated successfully", upDate});
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
//=========================deleteTask===============================
const deleteTask = async(req, res) => {
    try {
        const id = req.params.id
        const taskDeleted = await taskModel.findByIdAndDelete(id)
        if(taskDeleted) {
            res.status(200).send("Task deleted successfully")
        }else {
            res.status(400).send("Task already has been deleted")
        }
    }catch(err) {
        return res.status(500).json({ error: err.message });
}   
};

//============================getAllTasksThatNotDoneAfterDeadLine==============================

const getTasksNotDoneAfterDeadline = async (req, res) => {
    try {
      const currentDate = new Date(); 
      const pipeline = [
        {
          $match: {
            status: { $ne: 'done' }, 
            deadline: { $lt: currentDate }, 
          },
        },
      ];
      const tasks = await taskModel.aggregate(pipeline);
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
export {
    addTask,
    getTasks,
    upDateTask,
    deleteTask,
    getTasksNotDoneAfterDeadline
}

