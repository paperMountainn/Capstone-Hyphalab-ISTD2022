import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { mainPageNavItems } from '../../components/navbar/navbarLists';
import './home.scss';
import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { MyCarousel } from '../../components/carousel/Carousel';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';


const COLORS = {
  temp: '#8884d8',
  humidity: '#0088FE',
  co2: '#82ca9d'
}


export const Home = () => {
  console.log("home")
  return (
    <div>
      <Sidebar>
        {/* <div className="homeContainer"> */}
          <Navbar navItems={mainPageNavItems}/>
          {/* <div className="chartContainer"> */}

          

            {/* <div className="pb-4">
              <div className="row">
                
                <div className="col-6 ">
                  <div className="top row">
                    <h3 className="pb-2 pt-4">
                      <GiMushroomGills className='icon'/>
                      {' '}Incubation Area Summary
                    </h3>
                    <div className="row ">
                      <div className="col-6 flex-wrap"><Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/incubation/temperature"/></div>
                      <div className="col-6 flex-wrap"><Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/incubation/humidity"/></div> */}
                      {/* <DataRetrieve /> */}
                      
                    {/* <div className="col-6 d-flex flex-wrap">
                      <div className='pt-4'>
                        <Icon name="camera" className='icon'/>
                        Contamination Images
                      </div>
                      <MyCarousel />
                    </div>
                    <div className="col-6">
                      <div className='pt-4'>
                        <Icon name="camera" className='icon'/>
                        Observation Images
                      </div>
                      <MyCarousel />
                    </div>

                  </div>
               */}
                    
                    {/* <div className="col-6"><Chart aspect={3/1} title="Humidity Against Time"/></div> */}
                  {/* </div>
                </div> */}

                {/* <div className='col-1'></div> */}
                {/* <div className="col-6 flex-wrap"> */}
                  {/* <div className="top row d-flex flex-wrap"> */}
                    {/* <h3 className="pb-2 pt-4"><GiMushroomsCluster className='icon'/>{' '}Fruiting Area Summary</h3>
                    <div className="row">
                      <div className="col-6 flex-wrap"><Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/farm/temperature"/></div>
                      <div className="col-6 flex-wrap"><Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/farm/humidity"/></div>
                      <div className="col-6 pt-4 flex-wrap"><Chart aspect={2/1} title="CO2 vs Time" color={COLORS.co2} parameter="co2" location="/farm/humidity"/></div>
                      <div className="col-6 flex-wrap">
                        <h6 className='pt-4'>
                        <Icon name="camera" className='icon'/>
                        Observation Images
                        </h6>
                      <MyCarousel /></div> */}
                    {/* </div> */}
                  {/* </div> */}
                  {/* <div className="bottom row">
                  <div className="col-10">
                      <div className="stageTitle">
                        <Icon name="camera" className='icon'/>
                        Observation Images
                      </div>
                      <MyCarousel />
                  </div>
                  </div> */}
                {/* </div> */}


              {/* </div> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}

          <MDBRow>
            <MDBCol xl='6' className='pb-4'>
              <h3 className="pb-2 pt-4">
                <GiMushroomGills className='icon'/>
                {' '}Incubation Area Summary
              </h3>
              <MDBRow>
                <MDBCol lg='6'>
                  <div ><Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/incubation/temperature"/></div>
                </MDBCol>
                <MDBCol lg='6'>
                  <div ><Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/incubation/humidity"/></div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol lg='6'>
                <div >
                  <div className='pt-4'>
                    <Icon name="camera" className='icon'/>
                    Contamination Images
                  </div>
                  <MyCarousel />
                </div>                
                </MDBCol>
                <MDBCol lg='6'>
                <div >
                  <div className='pt-4'>
                    <Icon name="camera" className='icon'/>
                    Observation Images
                  </div>
                  <MyCarousel />
                </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBCol xl='6'>
              <h3 className="pb-2 pt-4">
              <GiMushroomsCluster className='icon'/>
              {' '}Fruiting Area Summary
              </h3>
              <MDBRow>
                <MDBCol lg='6'>
                <div ><Chart aspect={2/1} title="Temperature vs Time" color={COLORS.temp} parameter="temperature" location="/farm/temperature"/></div>
                </MDBCol>
                <MDBCol lg='6'>
                  <div ><Chart aspect={2/1} title="Humidity vs Time" color={COLORS.humidity} parameter="humidity" location="/incubation/humidity"/></div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol lg='6'>
                <div className="pt-4"><Chart aspect={2/1} title="CO2 vs Time" color={COLORS.co2} parameter="co2" location="/farm/humidity"/></div>
                </MDBCol>
                <MDBCol lg='6'>
                <div >
                  <h6 className='pt-4'>
                  <Icon name="camera" className='icon'/>
                  Observation Images
                  </h6>
                  <MyCarousel />
                </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>

        

      </Sidebar>

      
      
    </div>
  )
}
