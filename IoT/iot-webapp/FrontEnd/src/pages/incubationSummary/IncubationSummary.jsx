import React from 'react'
import { Icon } from 'semantic-ui-react';
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './incubationSummary.scss';
import { incubationNavItems } from '../../components/navbar/navbarLists';
import { GiH2O, GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { MyCarousel } from '../../components/carousel/Carousel';
const COLORS = {
  temp: '#8884d8',
  humidity: '#0088FE',
  co2: '#82ca9d'
}

export const IncubationSummary = () => {
  return (
    <div className='incubationSummary'>
      <Sidebar>
        <div className="incubationSummaryContainer">
          <Navbar navItems={incubationNavItems} />
          <div className="charts">
            <div className="container">
              <div className="top">
                <h3 className='pb-2'>
                  <GiMushroomGills className='icon'/>
                  Incubation Area Summary
                </h3>
                <div className="row">
                
                <div className="col-6"><Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/incubation/temperature"/></div>
                <div className="col-6"><Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/incubation/humidity"/></div>
                  {/* <div className="col-6">
                    <Chart aspect={2/1} title="CO2 Against Time"/>     
                  </div> */}
                </div>

              </div>
              <div className="bottom row">
              <div className="col-6 pb-4">
                      <div className='pt-4'>
                        <Icon name="camera" className='icon'/>
                        Observation Images
                      </div>
                      <MyCarousel />
                  </div>
                
              </div>
             
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
