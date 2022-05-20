import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

// db imports
import { db } from '../config/firebase-config';
import { collection, doc, getDocs } from 'firebase/firestore';

const Stuff = () => {
    // const [users, setUsers] = useState([]);
    const [datas, setDatas] = useState([]);

    // 1. create reference to the collection, as you can have multiple of this
    // specify which collection you want to grab data from: users
    // const usersCollectionRef = collection(db, 'user');
    const datasCollectionRef = collection(db, 'humidity');
    const tempCollectionRef = collection(db, 'temp');

    // called whenever page renders, like lifecycle 
    // everytime you make API req, it always return a promise,
    // promise: some data that needs to be resolved
    // you don't know when it is going to be resolved, so you need to use
    // either async-await or .then
    useEffect(()=>{
        // do not make useEffect async
        // define a function to get ALL user documents:
        const getDatas = async () => {
            // getDocs returns ALL documents from a specific collection
            const data = await getDocs(datasCollectionRef);
            // data is an object, we access the docs property, which is an array
            console.log(data.docs[0].data())
            // console.log(data.docs[0].data())
            setDatas((data.docs.map((doc)=> {
                return(
                    // return object containings
                    // you only the id, name and age and add the object to user array
                    // ... is spreading operator in javascript -> set object to have all fields that the thing returns
                    // you can add more fields to the object
                    // we are creating a JSON here.
                    {...doc.data(), id: doc.id}
                );
            })))
        };
        getDatas();
    },[]);

    // query from db, when someone opens up the website immediately
    return (
        <div>
          { datas.map((data)=> {
              return(
                  <div key={data.key}>
                      <h1>humidity: {data.humidity}</h1>
                      {/* <h2>Age: {data.age}</h2> */}
                      {/* <h3>{data.key}</h3> */}
                  </div>
              );
          })}
        </div>
    );
};

export default Stuff;