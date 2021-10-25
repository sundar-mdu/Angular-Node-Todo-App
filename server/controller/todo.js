import Todo from "../model/todoModel.js"
import mongoose from 'mongoose'

export const getTodo = async (req, res) => {
    try {
        const allTodo = await Todo.find();
        res.status(200).json(allTodo)
    } catch (error) {
        res.status(404).json({ message:error.message})
    }
}

export const createTodo = async (req, res) => {
    const todo = req.body
    const newTodo = new Todo(todo)
    try {
        await newTodo.save(newTodo)
        res.status(200).json(newTodo)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateTodo = async (req, res) => {    
    try {
        const id = req.params.id
        const todo = req.body
        if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({message: 'Todo Id Not Exist'})

        const updatedTodo = await Todo.findByIdAndUpdate(id, {...todo, _id:id}, {new:true})
        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const deleteTodo = async (req, res) => {    
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({message: 'Todo Id Not Exist'})

        await Todo.findByIdAndRemove(id)
        res.status(200).json({message: 'Todo deleted successfully!'})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}