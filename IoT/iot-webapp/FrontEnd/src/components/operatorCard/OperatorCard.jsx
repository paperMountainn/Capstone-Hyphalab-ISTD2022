import React from 'react'
import './operatorCard.scss'
import { Card, Icon, Button} from 'semantic-ui-react'
export const OperatorCard = ({operatorData, engineerData}) => {
    const {operatorId, taskReceived, operatorName} = operatorData
    const {taskAssigned, engineerName, engineerId} = engineerData
    return (
        <Card color='grey'>
            {console.log(taskReceived)}
            <Card.Content>
                <Card.Header>
                <Icon name="circle notch" />
                {operatorName}
                </Card.Header>
                <Card.Meta><div className='date metaInfo'>Operator id: {operatorId}</div></Card.Meta>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <b>Tasks:</b>
                    {
                        (taskReceived.length != 0) ?
                        (taskReceived.map((task)=>{
                            return(
                                <div key={task}>
                                    {/* <a href='#'>{task}</a> */}
                                    { taskAssigned.includes(task) ? <><a href='#'>{task} </a><Icon name="hand point left outline"/></> : <a href='#'>{task}</a>}
                                </div>
                            )
                        })):
                        <b>-</b>
                    }
                </Card.Description>
            </Card.Content>
            
            


        </Card>
  )
}
