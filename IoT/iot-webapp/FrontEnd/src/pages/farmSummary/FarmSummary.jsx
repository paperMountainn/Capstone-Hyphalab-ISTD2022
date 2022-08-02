import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './farmSummary.scss';
import { farmNavItems } from '../../components/navbar/navbarLists';
import { GiMushroomsCluster } from "react-icons/gi";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { HomeObservationImgCarousel } from '../../components/homeObservationImgCarousel/HomeObservationImgCarousel';
import { Icon } from 'semantic-ui-react';
const COLORS = {
  temp: '#8884d8',
  humidity: '#0088FE',
  co2: '#82ca9d'
}

export const FarmSummary = () => {
  return (
    <div className='farmSummary'>
      <Sidebar>
          <Navbar navItems={farmNavItems} />
            <div className='ms-4'>
              <h4 className='pb-2 pt-4'>
                <GiMushroomsCluster className='icon'/>
                {' '}Fruiting Area Summary
              </h4>
              <MDBRow>
                <MDBCol lg='12'>
                  <div>
                    <Icon name="line graph" />
                    Parameter Charts
                  </div>
                  <MDBRow>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/farm/temperature"/>
                    </MDBCol>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/farm/humidity"/>
                    </MDBCol>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="CO2 vs Time" color={COLORS.co2} parameter="co2" location="/farm/co2"/> 
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol lg='4'>
                        <div className=" pb-4">
                          <div className='pt-4'>
                            <Icon name="camera" className='icon'/>
                            Observation Images
                          </div>
                          <HomeObservationImgCarousel type="observe_farm"/>
                        </div>
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
