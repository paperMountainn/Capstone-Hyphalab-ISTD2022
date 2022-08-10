import React, {useEffect, useState} from 'react'
import './newPhaseFormModal.scss'
import { DatePicker, Space } from 'antd';
// import Box from '@mui/material/Box';
import { Button, Header, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
// import { Form } from 'react-bootstrap';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import axios from "axios";
import moment from 'moment';

import { IoFileTrayStacked } from "react-icons/io5";
const { RangePicker } = DatePicker;

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid black',
//   boxShadow: 24,
//   p: 4,
//   display: 'block'
// };

// const options = [
//   {
//     text: "hi",
//     value: "bye"
//   },  {
//     text: "hi",
//     value: "bye"
//   },
//   {
//     text: "hi",
//     value: "bye"
//   },  {
//     text: "hi",
//     value: "bye"
//   },
//   {
//     text: "hi",
//     value: "bye"
//   }
// ]

export const NewPhaseFormModal = () => {

  const [open, setOpen] = useState(false);
  const [belongsToRackOptions, setBelongsToRackOptions] = useState([]);
  const [belongsToCycleOptions, setBelongsToCycleOptions] = useState([]);
  const [inputs, setInputs] = useState({status: 'ongoing', phaseType:"incubation"});
  
  
  // const [createdPhaseId, setCreatedPhaseId] = useState('')

  // modal controls
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // upon modal rendering:
  useEffect(()=>{
    let isMounted = true; 
    const fetchCycleAndRackOptions = async() => {
      const response1 = await axios.get(`/cycle/avail-cycles`) 
      const response2 = await axios.get(`/rack/avail-racks`) 
      const availCycleData = response1.data
      const availRackData = response2.data
      console.log("susan hi")
      console.log(availCycleData)
      console.log(availRackData)
      

      const cycleOptions = []
      const rackOptions = []
      for (let availCycle of availCycleData){
        
        const { cycleName, _id } = availCycle
        cycleOptions.push({text: cycleName, value: _id})
      }
      for (let availRack of availRackData){
        
        const { rackName, _id } = availRack
        rackOptions.push({text: rackName, value: _id})
      }

      if (isMounted){
        setBelongsToCycleOptions(cycleOptions)
        setBelongsToRackOptions(rackOptions)
          
      }
     
    }
    
    // fetchResults()
    // createPhase()
  
    fetchCycleAndRackOptions()
    
  }, [])




  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const createPhase = async() => {
      // const phaseAPIbody = JSON.stringify(inputs)
      console.log(`Submitted inputs are: ${JSON.stringify(inputs)}`)
      // Submitted inputs are: {"status":"ongoing","phaseType":"incubation","phaseStartDate":"2022-07-09T16:00:00.000Z","phaseEndDate":"2022-07-16T15:59:59.999Z","phaseDescription":"asdf","belongsToRack":"62ce9d958919eaa0672a8de7","belongsToCycle":"62ce9d958919eaa0672a8dec"}
      const newPhaseresponse = await axios.post('/phase/new/', inputs)
      // shld return an id
      console.log(`response from api call POST /phase/new: ${newPhaseresponse.data}`)

      const phaseId = newPhaseresponse.data
      const rackIdSelected = inputs.belongsToRack
      // console.log(`selected rack id : ${rackIdSelected}`)
      const cycleIdSelected = inputs.belongsToCycle
      const response1 = await axios.patch(`/rack/use-rack/${rackIdSelected}`, {cycleId: cycleIdSelected, phaseType:"incubation"}) 
      
      // console.log(rackIdSelected)
      const response2 = await axios.patch(`/cycle/${cycleIdSelected}`, {phaseId: phaseId, rackId: rackIdSelected}) 

      console.log(`response from api patch rack call : ${response1.data}`)
      console.log(`response from api patch cycle call : ${response2.data}`)

    }

    await createPhase()
    
    // refresh page to show new phase card created 
    window.location.reload(false);

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

    // let name = ""
    // const value = new Date(date)
    // if (id == 1){
    //   name = "phaseStartDate"
    // }
  
    // else if (id == 2){
    //   name = "phaseEndDate"
    // }
  
    // setInputs(values => ({...values, [name]: value}))
    // console.log(e)

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

  // options for rackPhases selection
  // const phaseTypeOptions = [
  //   {text: 'Incubation', value: 'incubation' },
  //   {text: 'Farming', value: 'farming' },
  // ]
  

  return (
    <div>
    <Modal
      className='modalclass'
      size='tiny'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic color="black" icon labelPosition='right' onClick={handleOpen} className="button-open"
      
      >
      
        
      
      <Icon name='add' />
      Add Incubation Phase
    </Button>}
    >
      <Modal.Header><h4>Add A New Phase {<Icon name="add"/>}</h4></Modal.Header>
      <Modal.Content scrolling>
      <Form onSubmit={(e)=> handleSubmit(e)}>

        {/* <Form.Select name="phaseType" value="Incubation" onChange={handleChange} label="Phase Type" options={phaseTypeOptions} placeholder='phase' /> */}
        
        <Form.Field>
          <label>Phase Type</label>
          <input name="phaseType" value="incubation" readOnly placeholder='hi' />
        </Form.Field>
            
        
        <Form.Field>
            <label>Phase Date Start - Phase Date End</label>
            <Space direction='vertical'>
            {/* <DatePicker onChange={(date, dateString) => {onHandleDateChange(date, dateString, 2)}} /> */}
            <RangePicker
               ranges={{
                '1 Week': [moment(), moment().add(7, 'days')],
                '2 Weeks': [moment(), moment().add(14, 'days')],
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={onHandleDateChange}
            />
            </Space>
          </Form.Field>
        
        
        <Form.TextArea onChange={handleChange} name="phaseDescription" label='Phase Description' placeholder='Describe the phase...' />

        <Form.Select name="belongsToRack" onChange={handleChange} label="Select a Rack to Start Phase with" options={belongsToRackOptions} placeholder='Rack Selection' />
        <Form.Select name="belongsToCycle" onChange={handleChange} label="Select a Cycle to Attach Phase to" options={belongsToCycleOptions} placeholder='Cycle Selection' />

        <Button type='submit'>Submit</Button>
      </Form>
        
        {/* <Form onSubmit={(e)=> handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="user-email" defaultValue={inputs.email || ""} onChange={handleChange} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                Input a description.
                </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Select aria-label="Default select example" size='large'>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="user" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="user" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="user" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="user" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form> */}
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        {/* <Button
          content="Save"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        /> */}
      </Modal.Actions>
    </Modal>
    </div>
  )
}
