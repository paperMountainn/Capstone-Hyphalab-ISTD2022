import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './racksAll.scss';
import { rackNavItems } from '../../components/navbar/navbarLists';
import { RackInfoCard } from '../../components/rackInfoCard/RackInfoCard';
import { Card, Icon } from 'semantic-ui-react';


export const RacksAll = () => {
  const [allRacks, setAllRacks] = useState();
  useEffect(() => {
    // retrieve all cycles
    const fetchAllRacks = async() => {
    const response = await axios.get(`/rack/`)
      // console.log(response)
    const allRacks = response.data
    let allRacksList = []
    for (let rack of allRacks){
      // console.log(rack)
      const {containCycles, currentlyInUse, locatedIn, rackName, _id} = rack
      allRacksList.push({containCycles, currentlyInUse, locatedIn, rackName, id:_id})

    }
    console.log(allRacksList)
    setAllRacks(allRacksList)

  }
  fetchAllRacks()
    
  }, []);
  return (
    <div className='racksAllContainer'>
      <Sidebar>
        
          <Navbar navItems={rackNavItems} />
          <div className="stuffs">
            {
              allRacks 
              ? 
              (<Card.Group itemsPerRow={3}>
                {
                  allRacks.map((rackData)=>{
                    return(<RackInfoCard rackInfo={rackData} />)
                  })
                }
              </Card.Group>)
              :
              (<Icon name='circle notch' size='big' loading />)
            }
             
          </div>
          
      </Sidebar>
    </div>
  )
}
