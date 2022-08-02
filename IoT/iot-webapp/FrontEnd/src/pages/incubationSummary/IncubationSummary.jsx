import React from 'react'
import { Icon } from 'semantic-ui-react';
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './incubationSummary.scss';
import { incubationNavItems } from '../../components/navbar/navbarLists';
import { GiH2O, GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { MyCarousel } from '../../components/carousel/Carousel';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { HomeObservationImgCarousel } from '../../components/homeObservationImgCarousel/HomeObservationImgCarousel';
import { HomeContamImgCarousel } from '../../components/homeContamImgCarousel/HomeContamImgCarousel';
const COLORS = {
  temp: '#8884d8',
  humidity: '#0088FE',
  co2: '#82ca9d'
}

export const IncubationSummary = () => {
  return (
    <div>
      <Sidebar>
          <Navbar navItems={incubationNavItems} />
          <div className='ms-4'>
            <h4 className='pb-2 pt-4'>
              <GiMushroomGills className='icon'/>
              {' '}Incubation Area Summary
            </h4>
            <MDBRow>
                <MDBCol lg='12'>
                <div>
                          <Icon name="line graph" />
                          Parameter Charts
                        </div>
                  <MDBRow>
                    
                    <MDBCol lg='6'>
                      
                      
                      <Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/incubation/temperature"/>
                    </MDBCol>
                    <MDBCol lg='6'>
                      <Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/incubation/humidity"/>
                    </MDBCol>
                    <MDBRow>
                    <MDBCol lg='6'>
                      <div className=" pb-4">
                        <div className='pt-4'>
                          <Icon name="bug" className='icon'/>
                          Contaminations
                        </div>
                        <HomeContamImgCarousel />
                      </div>
                    </MDBCol>
                    <MDBCol lg='6'>
                      <div className=" pb-4">
                        <div className='pt-4'>
                          <Icon name="camera" className='icon'/>
                          Observation Images
                        </div>
                        <HomeObservationImgCarousel type="observe_incub"/>
                      </div>
                    </MDBCol>
                    
                    </MDBRow>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
        </div>
      </Sidebar>
    </div>
  )
}
