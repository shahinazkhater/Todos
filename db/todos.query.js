import {pool} from "../db.js";

export async function getAllTodos(){

    const res= await pool.query("select *from todos");
return res.rows;
}

////////////////////////////////

export async function getTodoById(id){
const res = await pool.query("select*from todos where id = $1 limit 1",[id])
return res.rows[0];}

//////////////////////////////////////////////////////////



export async function createTodo(title,body, done){
    const res = await pool.query (
        `INSERT INTO todos (title, body,  done)
     VALUES ($1, $2, $3)
     RETURNING *`
        ,[title,body, done])
    

       return res .rows[0];
}



/////////////////////////////////////////////


export async function updateTodo(id, data={}){
    const { title, body, created_at, done}= data;
    const res = await pool.query(
        `UPDATE todos
     SET title = $1, body = $2, created_at = $3, done = $4
     WHERE id = $5
     RETURNING *`, [id, title, body, created_at, done])
    return res.rows[0];
}



////////////////////////////////////////////

export async function deleteTodo(id){
    const res = await pool.query("DELETE FROM todos WHERE id = $1 RETURNING *",[id])
    return res.rows[0];
}

//////////////////////////////////////

export async function toggleTodo(id){
    const result = await pool.query(
         "UPDATE todos SET done = NOT done WHERE id  = $1 RETURNING *",[id]
    );
    return result.rows[0]; 

}