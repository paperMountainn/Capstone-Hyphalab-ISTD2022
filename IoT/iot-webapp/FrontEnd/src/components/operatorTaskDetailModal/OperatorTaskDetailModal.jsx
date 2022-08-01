import React, {useEffect, useState} from 'react'
import './operatorTaskDetailModal.scss'
import { Button, Header, Icon, Card, Image, Modal, Form, Segment } from 'semantic-ui-react'

export const OperatorTaskDetailModal = ({rowDetail}) => {
    console.log("hi")
    console.log(rowDetail)
    const [open, setOpen] = useState(false);
    // modal controls
    const handleOpen = () => setOpen(true);
    const handleSubmit = async(e)=>{
        e.preventDefault()
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
    
        <Modal
            className='modalclass'
            size='tiny'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
            // <Button animated basic color="blue" onClick={handleOpen} className="button-open" size='mini'>
            //     <Button.Content visible>Show Details</Button.Content>
            //     <Button.Content hidden>
            //     <Icon name='magnify' />
            //     </Button.Content>
            

                
            // </Button>
            <div className='viewButton'>View Details <Icon name="magnify"/></div>
            }
            >
            <Modal.Header><h4>Task Details <Icon name="sticky note outline" /></h4></Modal.Header>
            <Modal.Content scrolling>
                <Modal.Description>
                    <Segment>
                        <p>
                            <b>Task Name: </b>{rowDetail.taskName}
                        </p>
                        <p>{rowDetail.taskDescr}</p>
                        <p>
                            <b>Assigned By: </b> {rowDetail.assignedBy}
                        </p>
                        
                    </Segment>
                    <Segment>
                        <p>
                            <b>Created On: </b>{rowDetail.createdOn}
                        </p>
                        <p>
                            <b>Due Date: </b>{rowDetail.dateDue}
                        </p>
                        
                    </Segment>
                    <Segment>
                        <p>
                            <b>Completion Status: </b>{rowDetail.completionStatus}

                        </p>
                    </Segment>
                   

                </Modal.Description>
            </Modal.Content>


        </Modal>
        </>
    )
}
