import React, {useEffect, useState} from 'react'
import './phaseInfoModal.scss'
import axios from "axios";
import { Button, Segment, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import { db_time_parser } from '../../utils/dateHelper';
export const PhaseInfoModal = ({phaseId}) => {
    const [open, setOpen] = useState(false);
    const [phase, setPhase] = useState(null)
    const renderStatusIcon = (status)=>{
        if (status == "completed") {
            return <Icon color='green' name='checkmark'/>
        }
        if (status == "ongoing"){
            return <Icon color='blue' name='history'/>
        }
    }
    useEffect(()=>{
        let isMounted = true; 
        const fetchPhaseDetail = async()=>{
            const phaseDetailResponse = await axios.get(`/phase/${phaseId}`)
            const phaseDetail = phaseDetailResponse.data
            // console.log(`response from get phase detail: ${phaseDetail}`)
            console.log(phaseDetail)
            if (isMounted) setPhase(phaseDetail)
        }
        fetchPhaseDetail()
        return ()=>{ isMounted = false }
    }, [])

  return (
    <Modal
    className='modalclass'
    size='tiny'
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={
   <a href="#">{phaseId}</a>
   
  }
  
  >
    {phase && 
        <>

        <Modal.Header>
            <h4>Phase Details</h4>
        </Modal.Header>
        <Modal.Content scrolling>
            <Modal.Description>
                <Segment>
                    <p> 
                        <b>Phase id: </b> {phase._id} ({phase.phaseType})
                    </p>
                    <p> 
                        {phase.phaseDescription}
                    </p>
                    <p> 
                        <b>Phase Start Date: </b> {db_time_parser(phase.phaseStartDate)}
                    </p>
                    <p> 
                        <b>Phase End Date: </b> {db_time_parser(phase.phaseEndDate)}
                    </p>
                </Segment>
                <Segment>
                    <p> 
                        <b>Phase Status: </b> {phase.status} {renderStatusIcon(phase.status)}
                    </p>
                </Segment>

            </Modal.Description>
        </Modal.Content>
    
    </>
    }

  </Modal>
  )
}
