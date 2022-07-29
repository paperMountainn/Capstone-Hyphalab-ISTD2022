import React, {useEffect, useState} from 'react'
import { Button, Header, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from "axios"
import './finishFruitingFormModal.scss'

export const FinishFruitingFormModal = ({details}) => {
    const {rackDetails, cycleDetails, phaseDetails} = details
    const [open, setOpen] = useState(false);

    // modal controls
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
      e.preventDefault()
      const updateRackAndCycleStatus = async(e) => {
        // update farm phase to completed
        const farmPhaseId = phaseDetails.phaseId
        const cycleId = cycleDetails.cycleId
        const markFarmPhaseAsCompleted = await axios.patch(`/phase/${farmPhaseId}/update-status`)
        console.log(`response from api patch farm phase call : ${markFarmPhaseAsCompleted.data}`)
        const markCycleAsCompleted = await axios.patch(`/cycle/${cycleId}/update-status`)
        console.log(`response from api patch cycle call : ${markCycleAsCompleted.data}`)
        
      }
      await updateRackAndCycleStatus()
      window.location.reload(false);
    }
  return (
    <div>
      <Modal
        className='modalclass'
        size='tiny'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button animated color="green" onClick={handleOpen} className="button-open">
            <Button.Content visible><div style={{color: "white"}}>Complete Fruiting Phase</div></Button.Content>
            <Button.Content hidden>
            <div style={{color: "white"}}><Icon name='angle double right' /></div>
            </Button.Content>
          </Button>
      }
      >
        <Modal.Header><h4>Complete Fruiting Phase<Icon name='angle double right' /></h4></Modal.Header>
        <Modal.Content scrolling>
          <Form onSubmit={(e)=> handleSubmit(e)}>
                  
          <Form.Field>
            <label>This Phase will be marked as completed</label>
            <input value={phaseDetails.phaseId} readOnly placeholder='hi' />

          </Form.Field>
          <Form.Field>
            <label>This Cycle will be marked as completed</label>
            <input value={cycleDetails.cycleName} readOnly placeholder='hi' />
          </Form.Field>
            
            <Button type='submit'>Submit</Button>
          </Form> 
        </Modal.Content>
        

      </Modal>
    </div>
  )
}
