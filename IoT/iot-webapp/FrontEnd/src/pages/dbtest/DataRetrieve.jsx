import React, { useState, useEffect } from 'react'
import { projectRealtimeDb } from '../../config/firebase-config'

export const DataRetrieve = () => {
    // const [todoList, setTodoList] = useState();
    const [data, setData] = useState();

    // run only during first render
    useEffect(() => {
        const dataRef = projectRealtimeDb.ref('ESP32-Incubation-6C96CE57DDC4');
        dataRef
        .on('value', (snapshot) => {
          const datas = snapshot.val();
          console.log(datas) 
          const dataList = [];
          for (let timestamp in datas){
            const oneData = datas[timestamp]
            dataList.push(oneData)
          }
        //   for (let data in datas) {
        //     // console.log(id)
        //     dataList.push(data.timestamp );
        //   }
        //   console.log(todos)
          setData(dataList);
        });
      }, []);
      
      data && console.log(data);

    return (
        <div>
            { 
            data && 
            data.map((data)=>{
            return (
                <div key={data.timestamp}>
                    {data.humidity}
                </div>
            )
            }) 
            }
        </div>
        
    )
}


