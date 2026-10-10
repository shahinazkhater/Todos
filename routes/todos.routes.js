import express from "express";

import { getAllTodos, getTodoById, createTodo,updateTodo,deleteTodo, toggleTodo }
from  "../db/todos.query.js";


export const todosRouter= express.Router();





todosRouter.get("/", async (req, res)=>{

    const todo = await getAllTodos();
    res.json({
        data: todo,
    });
});
/////////////////////////////////////////////////////////////////

todosRouter.get("/:todo_id", async(req, res)=>{
    const todo = await getTodoById(req.params.todo_id);
    
    if(!todo){
      return res.status(404).json ({
        message:"Todo not found"
      });


    }
    res.json({
        data: todo,
    });
});


/////////////////////////////////////////////////////////////////


todosRouter.post("/", async(req, res)=>{
const todoData = req.body;

const todo =await createTodo(todoData.title, todoData.body, todoData.done)

res.status(201).json({
    message: "Todo created successfully",
    data : todo,
});

});
/////////////////////////////////////////////////////////////////

todosRouter.patch("/:todo_id", async (req, res) => {
  const id = req.params.todo_id;
  const todo = await getTodoById(id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  const updatedTodo = await updateTodo(
    id,
    req.body.title,
    req.body.body,
    req.body.created_at,
    req.body.done
  );

  return res.status(200).json({
    message: "Todo updated successfully",
    data: updatedTodo
  });
});


todosRouter.delete("/:todo_id", async (req, res) => {
  const id = req.params.todo_id;

  const todo = await deleteTodo(id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  return res.status(200).json({
    mssage: "Todo deleted successfully"
  });
});


todosRouter.patch("/:todo_id/toggle", async (req, res) => {
  const id = req.params.todo_id;
  const todo = await toggleTodo(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return res.json({ data: todo });
});
/*
let selectedtodo = todos.find((x)=> x.id== x)
let done =  true;
done = !done


*/