import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    todoName: String,
    completed: Boolean
})

const Todo = mongoose.model('Todo', todoSchema) 

export default Todo;