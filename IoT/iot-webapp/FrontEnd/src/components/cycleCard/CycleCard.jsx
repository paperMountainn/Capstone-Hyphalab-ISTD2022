import React from 'react'
import './cycleCard.scss'
import { Card, Icon, Button} from 'semantic-ui-react'
import { db_time_parser } from '../../utils/dateHelper';

export const CycleCard = ({cycleData}) => {
  // const cycleName = cycleData.cycleName
  const {belongToRack, createdOn, containPhases, id, cycleName, cycleDescription, cycleStatus} = cycleData
  const cycleCreatedOn = db_time_parser(createdOn)

  const cycleIcon = (status) => {
    if (status == "ongoing"){
      return(
      <Icon color="blue" name='history'/>
      )
    }
    else if (status == "completed"){
      return(<Icon color="green" name="checkmark"/>)
    }
    else {
      return(<Icon disabled name="circle notch"/>)
    }
  }
  
  return (
    
    <Card color='blue'>
      {console.log("hi from cycle card")}
      {console.log(`cycleid:${id}`)}
      {console.log(`containPhases:${containPhases}`)}
      {console.log(`belongToRack:${belongToRack}`)}

      <Card.Content className={cycleStatus}>
        <Card.Header>
          <Icon name="circle notch" />
          {cycleName}
        </Card.Header>
        <Card.Meta><div className='date metaInfo'>Cycle id: {id}</div></Card.Meta>
      </Card.Content>
      <Card.Content>
      <h6 className='text-deco'><b>Cycle Information</b></h6>
      <Card.Description><b>Created On: </b>{cycleCreatedOn}</Card.Description>
      <Card.Description><b>Description: </b>{cycleDescription}</Card.Description>
      </Card.Content>
      <Card.Content>
 
          <Card.Description><b>Belong To Rack: </b>
          {
            belongToRack ? {belongToRack} : <b>-</b>
          }
          </Card.Description>
     
        
      </Card.Content>

      <Card.Content>
      <Card.Description>
        <b>Contains Phases: </b>&nbsp;
        {
          (containPhases.length != 0) ? 
          (containPhases.map((phase)=>{
            return(
              <div key={phase}>
              <a href='#'>{phase}</a>
              </div>);
          }))
          :
          <b>-</b>
        }
      </Card.Description>
       
        <Card.Description>
            <b>Status: </b>{cycleStatus}&nbsp;
            {cycleIcon(cycleStatus)}
        </Card.Description>


      </Card.Content>

    </Card>
  )
}
