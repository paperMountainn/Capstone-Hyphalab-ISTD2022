import React from 'react'
import { Card } from 'semantic-ui-react'
import './card.scss';
import { RiTempHotLine } from "react-icons/ri";
export const MyCard = ({header, meta, icon, color}) => {
  return (
        <Card className='cardClass' color={color}>
          <Card.Content>

            <Card.Header >{header}</Card.Header>
            <Card.Meta>{meta}</Card.Meta>
            <Card.Description>
              <h1>{icon}</h1>
            </Card.Description>
          </Card.Content>
        </Card>
  )
}
