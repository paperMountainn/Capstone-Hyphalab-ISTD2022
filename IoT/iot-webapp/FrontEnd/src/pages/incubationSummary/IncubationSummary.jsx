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
            <h3 className='pb-2 pt-4'>
              <GiMushroomGills className='icon'/>
              {' '}Incubation Area Summary
            </h3>
            <MDBRow>
                <MDBCol lg='12'>
                  <MDBRow>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/farm/temperature"/>
                    </MDBCol>
                    <MDBCol lg='4'>
                      <Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/farm/humidity"/>
                    </MDBCol>
                    <MDBRow>
                    <MDBCol lg='4'>
                      <div className=" pb-4">
                        <div className='pt-4'>
                          <Icon name="camera" className='icon'/>
                          Observation Images
                        </div>
                        <MyCarousel />
                      </div>
                    </MDBCol>
                    </MDBRow>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
      </Sidebar>
    </div>
  )
}
