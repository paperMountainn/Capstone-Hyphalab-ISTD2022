import React from 'react'
import { Icon } from 'semantic-ui-react';
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './incubationSummary.scss';
import { incubationNavItems } from '../../components/navbar/navbarLists';
import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
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
                <div className="row">
                <div className="stageTitle">
                  <GiMushroomGills className='icon'/>
                  Incubation Stage Summary
                </div>
                <div className="col-6"><Chart aspect={2/1} title="Temperature Against Time" color={COLORS.temp} parameter="temperature"/></div>
                      <div className="col-6"><Chart aspect={2/1} title="Humidity Against Time" color={COLORS.humidity} parameter="humidity"/></div>
                  {/* <div className="col-6">
                    <Chart aspect={2/1} title="CO2 Against Time"/>     
                  </div> */}
                </div>
              </div>
              <div className="bottom row">
              <div className="col-6">
                      <div className="stageTitle">
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
