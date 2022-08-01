import React, {useEffect, useState} from 'react'
import './infoModal.scss'
import axios from "axios";
import { Button, Segment, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import { db_time_parser } from '../../utils/dateHelper';
export const InfoModal = ({cycleId, cycleName}) => {

  const [open, setOpen] = useState(false);

  // modal controls
  const handleOpen = () => setOpen(true);
  const [cycle, setCycle] = useState(null);

  useEffect(()=>{
    let isMounted = true; 
    const fetchCycleDetails = async()=>{
      const cycleDetailResponse = await axios.get(`/cycle/${cycleId}`)
      console.log(`response from get cycle detail: ${cycleDetailResponse.data}`)
      const cycleDetail = cycleDetailResponse.data
      console.log(cycleDetail)
      if (isMounted) setCycle(cycleDetail)
      
    }
    fetchCycleDetails()
    return ()=>{ isMounted = false }
  },[])
  const renderCycleStatusIcon = (cycleStatus) =>{
    if (cycleStatus == "ongoing"){
      return <Icon name="history" color='blue'/>
    }
    else if (cycleStatus == "completed"){
      return <Icon name="check" color='green'/>
    }
    else if (cycleStatus == "unused"){
      return <Icon name="close" color='grey'/>
    }
  }

  return (
    <Modal
      className='modalclass'
      size='tiny'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
     <a href="#">{cycleName}</a>
     
    }
    
    >
      {cycle &&     
      <>
      <Modal.Header><h4>Cycle Details {<Icon name="circle notch" />}</h4></Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Segment>
            <p>
              <b>Cycle Name: </b>{cycle.cycleName}
              
            </p>
            <p>
              <b>Created On: </b>{db_time_parser(cycle.createdOn)}
              
            </p>
            <p>{cycle.cycleDescription}</p>
          </Segment>
          <Segment>
          <p>
              <b>Contain Phases: </b>
              {cycle.containPhases.map((phase)=>{
                return(<p>{phase._id} ({phase.phaseType})</p>)
              })}
              
            </p>
            <p>
              <b>Belongs To Rack: </b> {cycle.belongsToRack.rackName}
            </p>

          </Segment>
          <Segment color="blue">
            <p>
              <b>Cycle Status: </b> {cycle.cycleStatus} {renderCycleStatusIcon(cycle.cycleStatus)}
            </p>
          </Segment>
        

          
        </Modal.Description>
      </Modal.Content>
      </>
      }
  
    </Modal>
  )
}
