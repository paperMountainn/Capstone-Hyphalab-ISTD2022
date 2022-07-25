import React,{ useState } from 'react'
import {Button, Modal, Icon, Form } from 'semantic-ui-react'
import { DatePicker, Space } from 'antd';
export const TaskFormModal = ({allOperatorData, engineerData}) => {
    // console.log(engineerData.engineerId)
    const allOperatorsOptions = allOperatorData.map((operator)=>{
      return {
        text: operator.operatorName,
        value: operator.operatorId}
    })
    const engineerOption = [{
      text: engineerData.engineerName,
      value: engineerData.engineerId
    }]

    // console.log(allOperatorsOptions)
    const [open, setOpen] = useState(false);
    // console.log(engineerData.engineerId)
    const [inputs, setInputs] = useState({
      completionStatus:"Incompleted"
    });
  

    // modal controls
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const onDateChange = (value, dateString) => {
    //   console.log('Selected Time: ', value);
    //   console.log('Formatted Selected Time: ', dateString);
    // };
    
    const onOk = (deadline) => {
      // console.log('onOk: ', value);
      const dateDue = new Date(deadline)
      setInputs(values => ({...values, dateDue}))
    };

    const handleChange = async(event, data) =>{ 
      let name = event.target.name;
      let value = event.target.value;

      if (data) {
        value = data.value
        name = data.name
      }
      setInputs(values => ({...values, [name]: value}))

    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      console.log(JSON.stringify(inputs))
    }


    
  return (
    <div>
        <Modal
        className='modalclass'
        size='tiny'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button basic color='black' icon labelPosition='right' onClick={handleOpen} className="button-open">
          
        Assign a new Task
        <Icon name='hand point left outline' />
        </Button>}
        >
        <Modal.Header><h4>Assign a new Task <Icon name="hand point left outline"/></h4></Modal.Header>
        <Modal.Content scrolling>
        <Form onSubmit={(e)=>handleSubmit(e)}>
                
        <Form.Field onChange={handleChange}>
          <label>Task Name</label>
          <input name="taskName" placeholder='Enter the name of task...' />
        </Form.Field>
        <Form.TextArea onChange={handleChange} name="taskDescr" label='Task Description' placeholder='Describe the task...' />
        <Form.Select name="assignedBy" onChange={handleChange} label="Assigned By" options={engineerOption} placeholder='Assigned By' />
        <Form.Select name="assignedTo" onChange={handleChange} label="Select an Operator" options={allOperatorsOptions} placeholder='Assign To Operator' />
        <Form.Field>
          <label>Deadline</label>
          <Space direction='vertical'>
            <DatePicker showTime onOk={onOk} />
          </Space>
        </Form.Field>

        


        <Button type='submit'>Submit</Button>
        </Form>

        </Modal.Content>

        <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
    
      </Modal.Actions>




        </Modal>

      
    </div>
  )
}
