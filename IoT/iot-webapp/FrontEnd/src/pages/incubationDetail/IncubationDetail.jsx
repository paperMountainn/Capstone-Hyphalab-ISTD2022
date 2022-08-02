import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './incubationDetail.scss';
import { MyCard } from '../../components/card/Card';
import { ActuatorForm } from '../../components/actuatorForm/ActuatorForm';

import { RiTempHotLine } from "react-icons/ri";
import { Icon } from 'semantic-ui-react';
import { FaCloudversify } from "react-icons/fa";
import { incubationNavItems } from '../../components/navbar/navbarLists';
import {Grid, Row, Col} from "react-bootstrap";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';


const cardDetails = [
  {
    color: "green",
    icon: (<RiTempHotLine />),
    header: "26.7",
    meta: "Average Temperature over 2 weeks", 
  },
  {
    color: "purple",
    icon: (<Icon name="cloud" inverted color='grey'/>),
    header: "67.8%",
    meta: "Average Humidity over 2 weeks", 
  },
  {
    color: "yellow",
    icon: (<FaCloudversify />),
    header: "26.7",
    meta: "Average CO2 measurement over 2 weeks", 
  },

]

export const IncubationDetail = () => {
  return (
    <div>
      <Sidebar>
          <Navbar navItems={incubationNavItems}/>
          <div className='ms-4'>
          <h3 className='pb-2 pt-4'>
            {' '}Parameter Details
          </h3>
          <MDBRow>
            <MDBCol lg='12'>
              <MDBRow>
                <MDBCol lg='8'>
                  <Chart aspect={2/1} title="Temperature vs Time" parameter="temperature" location="/incubation/temperature"/>
                </MDBCol>
                <MDBCol lg='4'>
                <p>Summarised Statistics</p>
                <MDBRow>
                  {cardDetails.map((cardDetail)=>{
                    return(
                      <MyCard 
                        header={cardDetail.header} 
                        meta={cardDetail.meta}
                        icon={cardDetail.icon}
                        color={cardDetail.color}
                      />
                    );
                  })}
                </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <div className="mt-4 pb-4">
            <ActuatorForm/>
            </div>
          </MDBRow>


      </div>          
      </Sidebar>
    </div>
  )
}
