import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './paramDetail.scss';
import { MyCard } from '../../components/card/Card';
import { ActuatorForm } from '../../components/actuatorForm/ActuatorForm';

import { RiTempHotLine } from "react-icons/ri";
import { Icon } from 'semantic-ui-react';
import { FaCloudversify } from "react-icons/fa";
import { farmNavItems } from '../../components/navbar/navbarLists';
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

export const ParamDetail = () => {
  return (
    <div className='paramDetail'>
      <Sidebar>
        <div className="paramDetailContainer">
          <Navbar navItems={farmNavItems}/>
          <div className="top">
            <div className="container">
              <div className="row">

                <div className="col-8 md-4">
                  <div className="graphDescr">Graph Detail</div>
                  <Chart aspect={2/1} title="Temperature vs Time" parameter="temperature" location="/incubation/temperature"/>
                  <div className="row">
                    <div className="col-8 mt-4 pb-4">
                    <ActuatorForm/>
                    </div>
                  </div>
                </div>

                <div className="col-4 md-4 pt-4">
                <div className="graphDescr">Summarised Statistics</div>
                <div className="row">
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
                </div>
                </div>
              </div>
              
              <div className="row">
              
              </div>

            </div>
          </div>
          
        </div>
      </Sidebar>
    </div>
  )
}
