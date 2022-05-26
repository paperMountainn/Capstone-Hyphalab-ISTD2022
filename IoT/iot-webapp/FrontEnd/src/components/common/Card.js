import React from 'react'
import { Card } from 'semantic-ui-react'

const InfoCard = (props) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header style={{minHeight:"2vh"}}>{props.title}</Card.Header>
                <Card.Meta>{props.date}</Card.Meta>
                <Card.Description style={{minHeight:"15vh"}}>
                {props.descr}
                </Card.Description>
                
            </Card.Content>
        </Card> 
        
        
    );
}

export default InfoCard;