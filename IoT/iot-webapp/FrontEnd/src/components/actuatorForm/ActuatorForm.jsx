import React from 'react'
import './actuatorForm.scss'
import {Form, Button} from "react-bootstrap";
import { Card } from 'semantic-ui-react';

export const ActuatorForm = () => {
  return (
    <Card>
      <Card.Content>
      <Card.Description>
        <h5 className='pb-4'>Actuator Value Change</h5>
      </Card.Description>
      <Form>
      <Form.Group className="mb-2" controlId="formBasicEmail">
        {/* <Form.Label>Upper Limit</Form.Label> */}
        <Form.Control type="number" placeholder="Enter upper limit value" />
        {/* <Form.Text className="text-muted">
          This is the upper limit.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        {/* <Form.Label>Lower Limit</Form.Label> */}
        <Form.Control type="number" placeholder="Enter lower limit value" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="secondary" type="submit">
        Confirm
      </Button>
      </Form>
      </Card.Content>
    </Card>
  )
}
