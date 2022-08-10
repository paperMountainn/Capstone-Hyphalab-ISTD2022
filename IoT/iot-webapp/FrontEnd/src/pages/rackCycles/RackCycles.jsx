import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './rackCycles.scss';
import { rackNavItems } from '../../components/navbar/navbarLists';
import { CycleCard } from '../../components/cycleCard/CycleCard';
import { NewCycleFormModal } from '../../components/newCycleFormModal/NewCycleFormModal';
import { Card, Icon} from 'semantic-ui-react';

export const RackCycles = () => {
  const [cycles, setCycles] = useState();
  useEffect(() => {
    let isMounted = true; 
    // retrieve all cycles
    const fetchAllCycles = async() => {
    // const response = await axios.get(`/cycle/`)
    // const response = await axios.get("https://mysterious-ridge-41801.herokuapp.com/cycle/")
    const response = await axios.get("/cycle")

      // console.log(response)
    const allCyles = response.data
    let cycleList = []
    for (let cycle of allCyles){
      console.log(cycle)
      const {belongsToRack, createdOn, containPhases, _id, cycleName, cycleDescription, cycleStatus} = cycle
      cycleList.push({belongsToRack, createdOn, containPhases, id: _id, cycleName, cycleDescription, cycleStatus})
    }
    console.log(cycleList)
    if (isMounted) setCycles(cycleList)

  }
  fetchAllCycles()
    
  }, []);
  return (
    <div className='rackCycleContainer'>
      <Sidebar>
        
          <Navbar navItems={rackNavItems} />
          <div className="stuffs">
          <NewCycleFormModal />
            {
              cycles
              ?
              (<Card.Group itemsPerRow={4} stackable={true} doubling={true}>
                {cycles.map((cycleData)=> {
                  return(
                    <CycleCard cycleData={cycleData}/>
                  );
                })}
              </Card.Group>)
              
              :
              (<Icon name='circle notch' loading size='big' />)
              
            }
         
        </div>
      </Sidebar>
    </div>
  )
}
