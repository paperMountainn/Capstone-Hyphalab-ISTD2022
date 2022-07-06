import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './rackPhases.scss';
import { rackNavItems } from '../../components/navbar/navbarLists';

export const RackPhases = () => {
  return (
    <div className='rackPhaseContainer'>
      <Sidebar>
        <div className="rackPhaseContainer">
          <Navbar navItems={rackNavItems} />
          <div className="charts">
            <div className="container">
              <div className="row">
                {/* <div className="col-4">
                  <Chart aspect={2/1} title="Temperature Against Time"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="Humidity Against Time"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="CO2 Against Time"/>     
                </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
