import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './farmSummary.scss';
import { farmNavItems } from '../../components/navbar/navbarLists';
import { GiMushroomsCluster } from "react-icons/gi";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

export const FarmSummary = () => {
  return (
    <div className='farmSummary'>
      <Sidebar>
          <Navbar navItems={farmNavItems} />
            <div className='ms-4'>
              <h3 className='pb-2 pt-4'>
                <GiMushroomsCluster className='icon'/>
                {' '}Fruiting Area Summary
              </h3>
              <MDBRow>
                <MDBCol lg='12'>
                  <MDBRow>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="Temperature vs Time" parameter="temperature" location="/farm/temperature"/>
                    </MDBCol>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="Humidity vs Time" parameter="humidity" location="/farm/humidity"/>
                    </MDBCol>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="CO2 vs Time" parameter="humidity" location="/farm/humidity"/> 
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
              {/* <div className="row">
                <div className="col-4">
                  <Chart aspect={2/1} title="Temperature Against Time" parameter="temperature" location="/farm/temperature"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="Humidity Against Time" parameter="humidity" location="/farm/humidity"/>     
                </div>
                <div className="col-4">
                  <Chart aspect={2/1} title="CO2 Against Time" parameter="humidity" location="/farm/humidity"/>     
                </div>
              </div> */}
        </div>
      </Sidebar>
    </div>
  )
}
