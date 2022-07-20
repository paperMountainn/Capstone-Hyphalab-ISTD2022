import React from 'react'
import './rackCard.scss'
import { Card, Icon, Button} from 'semantic-ui-react'
import { ProgressBar } from 'react-bootstrap'
import { IoFileTrayStacked } from "react-icons/io5";
import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { Progress } from 'semantic-ui-react'
import { db_time_parser } from '../../utils/dateHelper';
import { InfoModal } from '../infoModal/InfoModal';
export const RackCard = ({phaseData}) => {
  const progress = 60

  const phaseId = phaseData.id
  const phaseCreatedOn = db_time_parser(phaseData.createdOn)
  const phaseDescr = phaseData.phaseDescription
  const phaseDuration = phaseData.phaseDuration
  const phaseStartDate = db_time_parser(phaseData.phaseStartDate)
  const phaseEndDate = db_time_parser(phaseData.phaseEndDate)
  
  const phaseType = phaseData.phaseType
  const status = phaseData.status

  const belongsToCycle = phaseData.belongsToCycle
  const belongsToRack = phaseData.belongsToRack
  const {rackName, containCycles, currentlyInUse, locatedIn} = belongsToRack
  const {completed, containPhases, cycleDescr} = belongsToCycle

  return (
      <Card color="black">
        <Card.Header>
          <ProgressBar min={1} now={progress} label={`${progress}%`}/>
          {/* <div><Progress percent={44} style={{margin: 10}} size="big"/></div> */}
          
        </Card.Header>
        <Card.Content>
          <Card.Header>
            <IoFileTrayStacked /> {rackName}
          </Card.Header>
            <Card.Meta><div className='date metaInfo'>Rack id: {belongsToRack._id}</div></Card.Meta>
        </Card.Content>

        <Card.Content>
          <h6 className='text-deco'><b>Phase Information</b></h6>
          <Card.Meta><div className='date metaInfo'>Phase id: {phaseId}</div></Card.Meta>
          {/* <div className='label'><b>Created On: </b>{phaseCreatedOn}</div> */}
          <Card.Description><b>Created On: </b>{phaseCreatedOn}</Card.Description>
          <Card.Description><b>Description: </b>{phaseDescr}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            <b>Stage: </b>{phaseType}&nbsp;
            {phaseType == "incubation" ? <GiMushroomGills /> : <GiMushroomsCluster />} 
          </Card.Description>
          <Card.Description>
            <b>Status: </b>{status}&nbsp;
            {status == "ongoing" ? <Icon color="blue" name='history'/> : <Icon color="green" name="checkmark"/>} 
          </Card.Description>
        </Card.Content>
        <Card.Content>
          {/* <Card.Description><b>Belongs To Rack: </b>{}</Card.Description> */}
          <Card.Description><b>Belongs To Cycle: </b><InfoModal id={belongsToCycle._id} /></Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Description><b>Phase Duration: </b>{phaseDuration} days</Card.Description>
          <Card.Description><b>Start: </b>{phaseStartDate}</Card.Description>
          <Card.Description><b>End: </b>{phaseEndDate}</Card.Description>
        </Card.Content>
        <Card.Content extra>
           {phaseType == "incubation" ? 
           (<Button color='blue'><div>Move to Farm <Icon name='angle double right' /></div></Button>):
           (<Button color='green'><div>Finished Fruiting <Icon name='thumbs up outline' /></div></Button>)
            }
        </Card.Content>
      </Card>
    
      
  )
}


