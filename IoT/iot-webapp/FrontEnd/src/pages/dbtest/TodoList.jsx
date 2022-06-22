import React, { useState, useEffect } from 'react'
import { projectRealtimeDb } from '../../config/firebase-config'

export const TodoList = () => {
    const [todoList, setTodoList] = useState();

    // run only during first render
    useEffect(() => {
        const todoRef = projectRealtimeDb.ref('Todo');
        todoRef
        .on('value', (snapshot) => {
          const todos = snapshot.val();
          console.log(todos)
          // console.log(todos) 
          const todoList = [];
          for (let id in todos) {
            // console.log(id)
            todoList.push({ id: id, ...todos[id] });
          }
        //   console.log(todos)
          setTodoList(todoList);
        });
      }, []);
      
      console.log(todoList)

    return (
        <div>
            { 
            todoList && 
            todoList.map((todo)=>{
            return (
                <div key={todo.id}>
                    {todo.todo}
                </div>
            )
            }) 
            }

        </div>
        
    )
}


