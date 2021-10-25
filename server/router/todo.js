import express from "express";

import {getTodo, createTodo, updateTodo, deleteTodo } from '../controller/todo.js'

const router = express.Router();

router.get('/', getTodo)

router.post('/',createTodo)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)

export default router;