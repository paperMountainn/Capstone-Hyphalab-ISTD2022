import React, { useState, useEffect} from 'react'
import axios from "axios";
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './rackPhases.scss';
import { rackNavItems } from '../../components/navbar/navbarLists';
import { RackCard } from '../../components/rackCard/RackCard';
import { Card, Icon } from 'semantic-ui-react';

import { NewPhaseFormModal } from '../../components/newPhaseFormModal/NewPhaseFormModal';

export const RackPhases = () => {
  const [phases, setPhases] = useState();

  useEffect(() => {
    const fetchResults = async() => {
      const response = await axios.get(`/phase/ongoing`) 
      const originalFetchedPhases = response.data
      // console.log(originalFetchedPhases)
      let phases_list = []
      for (let phase of originalFetchedPhases){
        // console.log(phase.belongsToCycle.cycleName)
        const {_id, createdOn, phaseDescription, phaseStartDate, phaseEndDate, phaseType, status, belongsToCycle, belongsToRack} = phase
        phases_list.push( {id: _id, createdOn, phaseDescription, phaseStartDate, phaseType, status, belongsToCycle, belongsToRack, phaseEndDate} )
        
      }
      console.log(phases_list)
      setPhases(phases_list)
    }
    fetchResults()
    
  }, []);
  return (
    <div className='rackPhaseContainer'>
      <Sidebar>
        <div className="rackPhaseContainer">
          <Navbar navItems={rackNavItems} />
          <div className="stuffs">
            <NewPhaseFormModal modalDetails={{ phaseType:"incubation", icon: <Icon name='add'/>, color: "black"}} />
            {phases 
            ?
              (<Card.Group itemsPerRow={3} stackable={true} doubling={true}>
                 {phases.map((phaseData)=>{
                   return(
                     <RackCard key={phaseData.id} phaseData={phaseData}/> 
                     // "hi"
                   )
                 })}
               </Card.Group>) 
            :

            (<Icon name='sync alternate' loading size='big' />)
              
            }
       
              
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
