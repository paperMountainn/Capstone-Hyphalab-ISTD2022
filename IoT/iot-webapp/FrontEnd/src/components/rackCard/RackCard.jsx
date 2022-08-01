import React, {useEffect} from 'react'
import './rackCard.scss'
import { Card, Icon, Button} from 'semantic-ui-react'
import { ProgressBar } from 'react-bootstrap'
import { IoFileTrayStacked } from "react-icons/io5";
import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { db_time_parser, calculateDaysBetweenDates } from '../../utils/dateHelper';
import { InfoModal } from '../infoModal/InfoModal';
import { MoveToFarmFormModal } from '../moveToFarmFormModal/MoveToFarmFormModal';
import { Statistic } from 'antd';
import { FinishFruitingFormModal } from '../finishFruitingFormModal/FinishFruitingFormModal';

const { Countdown } = Statistic;
 // Moment is also OK

export const RackCard = ({phaseData}) => {
  const progress = 60

  const phaseId = phaseData.id
  const phaseCreatedOn = db_time_parser(phaseData.createdOn)
  const phaseDescr = phaseData.phaseDescription
  const phaseDurationInDays = calculateDaysBetweenDates(phaseData.phaseStartDate, phaseData.phaseEndDate)
  const phaseStartDate = db_time_parser(phaseData.phaseStartDate)
  const phaseEndDate = db_time_parser(phaseData.phaseEndDate)

  const durationMillis = new Date(phaseEndDate).getTime() - new Date(phaseStartDate).getTime()
  // console.log(stuff)
  const deadline = Date.now() + durationMillis;



  const phaseType = phaseData.phaseType
  const status = phaseData.status

  const belongsToCycle = phaseData.belongsToCycle
  const belongsToRack = phaseData.belongsToRack
  const {rackName, containCycles, currentlyInUse, locatedIn} = belongsToRack
  const {completed, containPhases, cycleDescr} = belongsToCycle

  const moveToFarmModalProp = {
    rackDetails:{rackId: belongsToRack._id, rackName: belongsToRack.rackName}, 
    phaseDetails:{phaseId, phaseEndDate}, 
    cycleDetails:{cycleId: belongsToCycle._id, cycleName: belongsToCycle.cycleName},
    incubPhaseId: phaseId
  }
  const finishFruitingFormModalProp = {
    rackDetails:{rackId: belongsToRack._id, rackName: belongsToRack.rackName}, 
    cycleDetails:{cycleId: belongsToCycle._id, cycleName: belongsToCycle.cycleName}, 
    phaseDetails:{phaseId, phaseEndDate}
  }
  const onFinish = () => {
    console.log('finished!');
  };
  // for countdown timer
  useEffect(() => {
    const oldFormatter = ref.current.formatCountdown;
    ref.current.formatCountdown = (...params) => {
      const result = oldFormatter(...params);
      const [day, hour, minute, second] = result.split(':');
      return (
        <>
          {day} days {hour} hrs {minute} min {second} s 
  
        </>
      );
    };
  }, []);

  const ref = React.useRef();

  return (
      <Card color="black">
        
        <Card.Header>
          {/* <ProgressBar min={1} now={progress} label={`${progress}%`}/> */}

          {/* <Countdown value={deadline} onFinish={onFinish} format={`D  H  m  s ${days} `}/> */}
          
          {/* <div><Progress percent={44} style={{margin: 10}} size="big"/></div> */}
          
        </Card.Header>
        <Card.Content>
          <Card.Header>
            <IoFileTrayStacked /> {rackName}
          </Card.Header>
            <Card.Meta><div className='date metaInfo'>Rack id: {belongsToRack._id}</div></Card.Meta>
        </Card.Content>

        <Card.Content>
        
          <Countdown 
            ref={ref}
            format="DD:HH:mm:ss"
            title="Time Left"
            value={deadline}
            className="hi"
          />
          
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
          <Card.Description><b>Belongs To Cycle: </b><InfoModal cycleId={belongsToCycle._id} cycleName={belongsToCycle.cycleName}/></Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Description><b>Phase Duration: </b>{phaseDurationInDays} days</Card.Description>
          <Card.Description><b>Start: </b>{phaseStartDate}</Card.Description>
          <Card.Description><b>End: </b>{phaseEndDate}</Card.Description>
        </Card.Content>
        <Card.Content extra>
           {phaseType == "incubation" ? 
           
          //  (<Button color='blue'><div>Move to Farm <Icon name='angle double right' /></div></Button>):
          (<MoveToFarmFormModal details={moveToFarmModalProp}/>):
          //  (<Button color='green'><div>Finished Fruiting <Icon name='thumbs up outline' /></div></Button>)
          (<FinishFruitingFormModal details={finishFruitingFormModalProp}/>)
            }
        </Card.Content>
      </Card>
    
      
  )
}


