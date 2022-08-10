import React, {useState, useEffect} from 'react'
import { engineerPageNavItems } from '../../components/navbar/navbarLists'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar';
import { TaskFormModal } from '../../components/taskFormModal/TaskFormModal';
import { OperatorCard } from '../../components/operatorCard/OperatorCard';
import { Card, Icon } from 'semantic-ui-react';
import axios from 'axios';

export const AssignTasks = () => {

  // retrieve all operators and corr tasks assigned to them

  const [operators, setOperators] = useState()
  const [engineer, setEngineer] = useState()
  useEffect(()=>{
    const fetchOperatorsAndEngineer = async() => {
      const response1 = await axios.get('/user/operators')
      const response2 = await axios.get('/user/engineers')
      console.log("hi")
      console.log(response1)
      console.log(response2)
      const allOperatorData = response1.data
      const allEngineerData = response2.data
      const {_id, taskAssigned, userName} = allEngineerData[1]
      setEngineer({taskAssigned, engineerName: userName, engineerId: _id})
      
      let operator_list = []
      for (let operator of allOperatorData){
        console.log(operator)
        const {_id, taskReceived, userName} = operator
        operator_list.push({operatorId: _id, taskReceived, operatorName: userName})
      }
      setOperators(operator_list)
      // console.log(operator_list)
    }

    fetchOperatorsAndEngineer()
   


  },[])
  return (
    <div className='tasks'>
    <div className="tasksContainer">
      <Sidebar>
      <Navbar navItems={engineerPageNavItems}/>
      
      <div className='stuffs'>
      <h4>
            {' '}<Icon name="sticky note" />Operators and Task Assigned
      </h4>
      
      {(operators && engineer)&&
       <>
       <h6>{' '}<Icon color="grey" name="user" />Engineer Name: {engineer.engineerName}</h6>
       <TaskFormModal allOperatorData={operators} engineerData={engineer}/>
       </>
      }
     
        
        {
        (operators && engineer)
        ?
        (<Card.Group itemsPerRow={3} stackable={true} doubling={true}>
          {operators.map((operatorData)=>{
            return(
              <OperatorCard key={operatorData._id} operatorData={operatorData} engineerData={engineer} /> 
            )
          })}
        </Card.Group>) 
        :
        (<Icon name='sticky note' size='big' loading />)
        }
      </div>
      
      </Sidebar>
    </div>
  </div>
  )
}
