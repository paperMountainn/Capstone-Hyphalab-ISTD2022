import React from 'react'
import './operatorCard.scss'
import { Card, Icon, Button, Image, Table, Label, Menu} from 'semantic-ui-react'
import { TaskDetailModal } from '../taskDetailModal/TaskDetailModal'
import { useEffect } from 'react'
import axios from 'axios'
import { profileImgs } from './operatorProfileImgs'
export const OperatorCard = ({operatorData, engineerData}) => {
    const {operatorId, taskReceived, operatorName} = operatorData
    const {taskAssigned, engineerName, engineerId} = engineerData
    // taskAssigned and taskReceived are array of task objs
    const taskDetailModalProp = (taskR)=>{
        return (
            {
                taskName: taskR.taskName,
                taskId: taskR._id,
                dateDue: taskR.dateDue,
                createdOn: taskR.createdOn,
                operatorName: operatorName,
                taskDescr: taskR.taskDescr,
                completionStatus: taskR.completionStatus
            })
    }

    const completionStatusRender = (completionStatus)=>{
        if (completionStatus == "Completed"){
            return (
                <Icon name="check" color="green"/>
            )

        }
        else if (completionStatus == "Incompleted"){
            return <Icon name="history" color="blue"/>
        }
        else if (completionStatus == "Delayed"){
            return <Icon name="exclamation circle" color="orange"/>
        }
    }
    
   
    return (
        
        <Card>
            
            {console.log(operatorName)}
            {console.log(engineerName)}
            {console.log(engineerId)}
            {console.log(taskAssigned)}
            {console.log(taskReceived)}
            {/* {console.log(taskReceived)} */}
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src={profileImgs[operatorName]}
                
                />
                <Card.Header>
                <Icon name="user outline" />
                {operatorName}
                </Card.Header>
                <Card.Meta><div className='date metaInfo'>Operator id: {operatorId}</div></Card.Meta>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    
                    <b>Tasks:</b>
                    {
                        (taskReceived.length != 0) ?
                        (taskReceived.map((taskR)=>{
                            return(
                                // loop thru all taskReceived by operator.
                                // if taskR's id is equals to one of the taskAssigned's id, return true
                                // if true is returned, render a point left icon indicating that engineer assigned that task!
                                <div key={taskR._id}>
                                    
                                    {/* { Object.values(taskAssigned).includes(task.id) ? <><a href='#'>{task.taskName} </a><Icon name="hand point left outline"/></> : <a href='#'>{task.taskName}</a>} */}
                                    { (taskAssigned.find(taskA => taskA._id === taskR._id)? true: false) ? 
                                        <>
                                        {completionStatusRender(taskR.completionStatus)}
                                        <a href="#">
                                            <TaskDetailModal assignedByYou={true} taskDetailProps={taskDetailModalProp(taskR)}/>
                                        </a>&nbsp;
                                        <Icon name="hand point left outline"/>
                                        </> 
                                        : 
                                        <>
                                        {completionStatusRender(taskR.completionStatus)}
                                        <a href='#'>
                                            <TaskDetailModal taskDetailProps={taskDetailModalProp(taskR)} assignedByYou={false}/>
                                        </a>
                                        </>
                                        }
                                </div>
                            )
                        })):
                        <b>-</b>
                    }
                    
                </Card.Description>
            </Card.Content>
         
                
        
            
            


        </Card>
  )
}
