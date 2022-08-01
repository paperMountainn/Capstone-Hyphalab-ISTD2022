import React, {useEffect, useState} from 'react'
import './taskDetailModal.scss'
import axios from 'axios'
import { Button, Header, Icon, Card, Image, Modal, Form, Checkbox, Segment, Message } from 'semantic-ui-react'
import { db_time_parser } from '../../utils/dateHelper'

export const TaskDetailModal = ({taskDetailProps, assignedByYou}) => {
    // const [taskDetails, setTaskDetails] = useState(null)
    // console.log(taskDetailProps)
    // useEffect(()=>{
    //     const fetchTaskDetail = async()=>{
    //         const getTaskDetailResponse = await axios.get(`/task/${taskDetail.taskId}`)
    //         // console.log(getTaskDetailResponse.data)
    //         const taskDetail = getTaskDetailResponse.data
    //         setTaskDetails(taskDetail)
    //     }
    //     fetchTaskDetail()
    // }, [])
    const completionStatusRender = (completionStatus)=>{
        if (completionStatus == "Completed"){
            return (
                <><Icon name="check" color="green"/>{completionStatus}</>
            )

        }
        else if (completionStatus == "Incompleted"){
            return(<><Icon name="history" color="blue"/>{completionStatus}</>)
        }
        else if (completionStatus == "Delayed"){
            return(<><Icon name="exclamation circle" color="orange"/>{completionStatus}</>)
        }
    }

    const [open, setOpen] = useState(false);
    // modal controls
    const handleOpen = () => setOpen(true);
    return (
        (
            <Modal
                className='modalclass'
                size='tiny'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<a>{taskDetailProps.taskName}</a>}
                // centered={false}
                >
                
                    <Modal.Header><h4>Task Details { <Icon name="sticky note" />}</h4></Modal.Header>
                    
                <Modal.Content scrolling>
                
                <Modal.Description>
               
                    <Segment>
                        {assignedByYou ?   <Message positive>
                        <Message.Header>This task is Assigned by you</Message.Header>
                    </Message> : null}
                   
                        {/* <Header>Task</Header> */}
                        <p>
                            <b>Task: </b>{taskDetailProps.taskName}
                        </p>
                        <p>{taskDetailProps.taskDescr}</p>
                    </Segment>
                    <Segment>
                        <p>
                            <b>Assigned To Operator: </b>{taskDetailProps.operatorName}
                        </p>
                        <p>
                            <b>Created On: </b> {db_time_parser(taskDetailProps.createdOn)}
                        </p>
                        <p>
                            <b>Due Date: </b> {db_time_parser(taskDetailProps.dateDue)}
                        </p>
                        
                    </Segment>
                    <Segment>
                        <p>
                            <b>Completion Status: </b>
                            {completionStatusRender(taskDetailProps.completionStatus)}
                        </p>
                    </Segment>
                
                </Modal.Description>
                </Modal.Content>
                
                
            
            </Modal>
        )

    )
}
