import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './farmSummary.scss';
import { farmNavItems } from '../../components/navbar/navbarLists';

export const FarmSummary = () => {
  return (
    <div className='farmSummary'>
      <Sidebar>
        <div className="farmSummaryContainer">
          <Navbar navItems={farmNavItems} />
          <div className="charts">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <Chart aspect={2/1} title="Temperature Against Time"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="Humidity Against Time"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="CO2 Against Time"/>     
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
