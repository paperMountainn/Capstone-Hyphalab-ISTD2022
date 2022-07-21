import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './farmSummary.scss';
import { farmNavItems } from '../../components/navbar/navbarLists';
import { GiMushroomsCluster } from "react-icons/gi";

export const FarmSummary = () => {
  return (
    <div className='farmSummary'>
      <Sidebar>
        <div className="farmSummaryContainer">
          <Navbar navItems={farmNavItems} />
          <div className="charts">
            <div className="container">
              <h3 className='pb-2'>
                  <GiMushroomsCluster className='icon'/>
                  Fruiting Area Summary
                </h3>
              <div className="row">
                <div className="col-4">
                  <Chart aspect={2/1} title="Temperature Against Time" parameter="temperature" location="/farm/temperature"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="Humidity Against Time" parameter="humidity" location="/farm/humidity"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="CO2 Against Time" parameter="humidity" location="/farm/humidity"/>     
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
