import React, { useState } from 'react';
import { projectRealtimeDb } from '../../config/firebase-config'    
// https://github.com/Chensokheng/crud-todo-app/tree/master/src/components

export const MyForm = () => {
    const [todo, setTodo] = useState('sss');

    const handleOnChange = (e) => {
      setTodo(e.target.value);
    };

    const createTodo = () => {
      const todoRef = projectRealtimeDb.ref('Todo');
      const stuff = {
        todo,
        complete: false,
      };
  
      todoRef.push(stuff);
    };
    return (
      <div>
        {console.log(todo)}
        <input type="text" onChange={handleOnChange} value={todo} />
        <button onClick={()=>{createTodo()}}>Add Todo</button>
      </div>
    );
}
