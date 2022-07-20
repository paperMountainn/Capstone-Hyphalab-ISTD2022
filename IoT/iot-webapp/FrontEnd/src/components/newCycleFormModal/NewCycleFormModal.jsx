import React, {useEffect, useState} from 'react'
import './newCycleFormModal.scss'
import { Button, Header, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import axios from "axios";
import moment from 'moment';


export const NewCycleFormModal = () => {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState({cycleStatus: "unused"});
    
    // modal controls
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createCycle = async() => {
            console.log(`Submitted inputs are: ${JSON.stringify(inputs)}`)
            const response = await axios.post('/cycle/new/', inputs)
            console.log(`response from api call POST /cycle/new: ${response.data}`)
        }
        createCycle()
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




    return (
        <div>
            <Modal
            className='modalclass'
            size='tiny'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button basic color='blue' icon labelPosition='right' onClick={handleOpen} className="button-open">
                
            Add A New Cycle
            <Icon name='add' />

        </Button>}
            >
            <Modal.Header><h4>Add A New Cycle <Icon name="add"/></h4></Modal.Header>
            <Modal.Content scrolling>
            <Form onSubmit={(e)=> handleSubmit(e)}>         
                <Form.Field onChange={handleChange}>
                    <label>Cycle Name</label>
                    <input name="cycleName" placeholder='Cycle Name' />
                </Form.Field>
                <Form.TextArea onChange={handleChange} name="cycleDescription" label='Cycle Description' placeholder='Describe the cycle...' />
                <Button primary type='submit'>Submit</Button>
            </Form>

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
