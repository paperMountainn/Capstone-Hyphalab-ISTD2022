import React from 'react'
import './rackInfoCard.scss'
import { Card, Icon, Button} from 'semantic-ui-react'
import { IoFileTrayStacked } from "react-icons/io5";
import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { InfoModal } from '../infoModal/InfoModal';
export const RackInfoCard = ({rackInfo}) => {
  const {containCycles, currentlyInUse, locatedIn, rackName, id} = rackInfo
  // console.log(containCycles)
  const isInUse = currentlyInUse.toString()
  const cardStyleClass = (isInUse) => {
    if (isInUse.toString() == "true"){
        return "unavail-rack"
      }
      else if (isInUse.toString() == "false"){
        return "avail-rack"
    }
  }

  return (
    <Card color='brown'>
      <Card.Content className={`${cardStyleClass(isInUse)}`}>
        <Card.Header >
          <IoFileTrayStacked />&nbsp;
          {rackName}
        </Card.Header>
        <Card.Meta><div className='date metaInfo'>Rack id: {id}</div></Card.Meta>
      </Card.Content>
      <Card.Content>
        <Card.Description><b>Located In: </b>{locatedIn}&nbsp;
        {locatedIn == "incubation" ? <GiMushroomGills /> : <GiMushroomsCluster />} 
        </Card.Description>
        <Card.Description>
          <b>Currently In Use: </b>{isInUse.toString()}&nbsp;
          {isInUse == "true" ? <Icon color="blue" name='sync'/> : <Icon color="green" name="checkmark"/>} 
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description><b>Contain Cycles: </b>
        {
          (containCycles.length != 0)
          ?
          (
            containCycles.map((cycle)=>{
              return(
                <div key={cycle._id}>
                  <InfoModal cycleId={cycle._id} cycleName={cycle.cycleName}/>
                </div>
              )
            })
          )
          :
          <b>-</b>
        }
        </Card.Description>
        
        {/* {console.log(currentlyInUse)} */}
      </Card.Content>

      
    </Card>
  )
}