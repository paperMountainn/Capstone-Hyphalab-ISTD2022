import React, {useEffect, useState} from 'react'
import './moveToFarmFormModal.scss'
import { DatePicker, Space } from 'antd';
import { Button, Header, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from "axios";
import moment from 'moment';
import './moveToFarmFormModal.scss'
const { RangePicker } = DatePicker;

export const MoveToFarmFormModal = ({details}) => {
  const {rackDetails, phaseDetails, cycleDetails, incubPhaseId} = details
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(
    {
      status: 'ongoing', 
      phaseType:"farming", 
      incubPhaseId : phaseDetails.phaseId,

    }
  );
  // modal controls
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(inputs)
    const createPhase = async() => {
      // create a new Farm Phase, with end date of incub phase as start date
      console.log(`Submitted inputs are: ${JSON.stringify(inputs)}`)
      const newPhaseResponse = await axios.post('/phase/new/', inputs)
      console.log(`response farm phase id from api call POST /phase/new: ${newPhaseResponse.data}`)

      // attach phase to Rack
      const newPhaseId = newPhaseResponse.data
      const attachPhaseToCycleResponse = await axios.patch(`/cycle/${cycleDetails.cycleId}`, {phaseId: newPhaseId, rackId: rackDetails.rackId}) 
      console.log(`response from api patch cycle call : ${attachPhaseToCycleResponse.data}`)

      // mark prev incub phase as completed
      const markPrevIncubPhaseCompleteResponse = await axios.patch(`/phase/${incubPhaseId}/update-status`)
      console.log(`response from api patch prev incub phase call : ${markPrevIncubPhaseCompleteResponse.data}`)

    }
    await createPhase()
    
  }

  // general form inputs
  const handleChange = (event, data) => {
    let name = event.target.name;
    let value = event.target.value;
    // for selection menus
    if (data) {
      // console.log(data.value)
      // console.log(data.name)
      value = data.value
      name = data.name

    }
    setInputs(values => ({...values, [name]: value}))
  }

  

  // for date range picker
  const onHandleDateChange = (dates, dateStrings, id) => {


    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);

      const phaseStartDate = new Date(dates[0])
      const phaseEndDate = new Date(dates[1])

      setInputs(values => ({...values, phaseStartDate, phaseEndDate}))
      // console.log(dateStrings[0])
      // console.log(dateStrings[1])
    } else {
      console.log('Clear');
    }
  };

  return (
    <div>
      {/* {console.log(details)} */}
      <Modal
      className='modalclass'
      size='tiny'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <Button animated color="blue" onClick={handleOpen} className="button-open">
        <Button.Content visible>Move to Farm</Button.Content>
        <Button.Content hidden>
        <Icon name='angle double right' />
        </Button.Content>
      

        
      </Button>
      }
      >
        <Modal.Header><h4>Move to Farm <Icon name='angle double right' /></h4></Modal.Header>
        <Modal.Content scrolling>
          <Form onSubmit={(e)=> handleSubmit(e)}>
            <Form.Field required>

              <label>Phase Type</label>
              <input name="phaseType" value="farming" readOnly/>
            </Form.Field>

            <Form.Field required>
              <label>Phase Date Start - Phase Date End</label>
              <Space direction='vertical'>
              {/* <DatePicker onChange={(date, dateString) => {onHandleDateChange(date, dateString, 2)}} /> */}
              <RangePicker
              
                defaultValue={[moment(phaseDetails.phaseEndDate)]}
                ranges={{
                  '1 Week': [moment(phaseDetails.phaseEndDate), moment(phaseDetails.phaseEndDate).add(7, 'days')],
                  '2 Weeks': [moment(phaseDetails.phaseEndDate), moment(phaseDetails.phaseEndDate).add(14, 'days')],
                }}
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                onChange={onHandleDateChange}
              />
              </Space>
          </Form.Field>
          <Form.TextArea onChange={handleChange} name="phaseDescription" label='Phase Description' placeholder='Describe the phase...' />
          <Form.Select required name="belongsToRack" defaultValue={[rackDetails.rackId]} options={[{text: rackDetails.rackName, value:rackDetails.rackId}]} onChange={handleChange} label="Select a Rack to Start Phase with" placeholder='Rack Selection' />
          <Form.Select required defaultValue={[cycleDetails.cycleId]} options={[{text: cycleDetails.cycleName, value:cycleDetails.cycleId}]} name="belongsToCycle" onChange={handleChange} label="Select a Cycle to Attach Phase to" placeholder='Cycle Selection' />


            <Button type='submit'>Confirm</Button>
          </Form>
          
        </Modal.Content>

      </Modal>
      </div>
  )
}
