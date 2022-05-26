import React, {useState} from 'react'
// import { realtime_database, ref, set } from '../config/firebase-config';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
// import { firebase } from '../config/firebase-config';

export default function Form() {
    const [title, setTitle] = useState('')

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    }
    const createTodo = () => {
        // const todoRef = firebase.database().ref('Todo');

        // const todo = {
        //     title: title,
        //     complete: false,
        // }
        // todoRef.push(todo)
        const db = getDatabase();
        const db_ref = ref(db, 'users/' + 12123)
        const ref2 = ref(db, 'hi/')
        let data = {
            title: title
        }
        
        update(db_ref, 
            data);

        // onValue(db_ref, (snapshot) => {
        //     const data = snapshot.val();
        //     // setTitle(postElement, data);
        //     console.log(data)
        //     });
        
    
    }

    return (
        <div>
            <input type="text" onChange={handleOnChange} value={title}/>
            <button onClick={createTodo}>Add ToDo </button>
        </div>
    )
}
