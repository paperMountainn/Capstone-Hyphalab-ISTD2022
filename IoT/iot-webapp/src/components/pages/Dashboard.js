import React from 'react'
import { Card } from 'semantic-ui-react'
import InfoCard from '../common/Card'
import { Segment } from 'semantic-ui-react'
import ImageCarousel from '../common/ImageCarousel'

export default function Dashboard() {
  return (
    <div>
      <Card.Group>
        <InfoCard 
          title="Temperature"
          date="01/04/2022"
          descr="help"
        />
        <InfoCard 
          title="Humidity"
          date="01/04/2022"
          descr="5%"
        />
        <InfoCard 
          title="Light"
          date="01/04/2022"
          descr="8/10"
        />
      </Card.Group>
      <br />
      <ImageCarousel />
      
    </div>
  )
}
