import React, { useState, useEffect} from 'react'
import axios from "axios";
export const MongoTry = () => {
  const [taskList, setTaskList] = useState([]);
  const hardcodeEngineerUID = '62b295f033d4ff5e8595557e'
  const hardcodeOperatorUID = '62b2a101f6012464133cb79f'
  // const hi = "62b2a101f6012464133cb7a0"

  useEffect(() => {
    const fetchResults = async() => {
      // const response = await axios.get(`/user/${hardcodeOperatorUID}`)  
      const response = await axios.get(`/task/${hardcodeOperatorUID}/myTasks`) 
      // setStuffs(response.data)
      const tasks = response.data
      console.log(tasks)
      let taskList = []
      for (let task of tasks){
        // console.log(task)
        const {_id, taskName, taskDescr, completionStatus, dateAssigned, dateDue, assignedBy } = task
        const assignedByUser = assignedBy.userName
        taskList.push( {id: _id, taskName, taskDescr, completionStatus, dateAssigned, dateDue, assignedByUser } )
      }
      console.log(taskList)
      setTaskList(taskList)
      
    }
    fetchResults()
    
 }, []);

  return (
    <div>
      {
        taskList&&
        taskList.map((task)=>{
          return(
            <div key={task._id}>{task.taskName}</div>
          )
        })
      }
    </div>
  )
}
