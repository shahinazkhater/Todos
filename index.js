import 'dotenv/config';



import express from "express";

import { todosRouter } from "./routes/todos.routes.js";


const app = express();


app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.path);
  next();
});

app.use("/todos", todosRouter);

app.use((err, req, res, next) => {
  console.log("err", err);
  res.status(500).json({ error: "something went wrong" });
  
});


app.listen (3000, ()=>{
    console.log("server is running on port 3000");
})