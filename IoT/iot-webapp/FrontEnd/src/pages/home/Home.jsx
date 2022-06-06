import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './home.scss';

export const Home = () => {
  return (
    <div className='home'>
      <Sidebar>
        <div className="homeContainer">
          <Navbar />
          <div className="chartContainer">
            <div className="container">
              
              <div className="row">
                
                <div className="col-6">
                  <div className="stageTitle">Incubation Stage Summary</div>
                  <div className="row">
                    <div className="col-6"><Chart aspect={2/1} title="Temperature Against Time"/></div>
                    <div className="col-6"><Chart aspect={2/1} title="Humidity Against Time"/></div>
                    contamination images
                    observation images
                    {/* <div className="col-6"><Chart aspect={3/1} title="Humidity Against Time"/></div> */}
                  </div>
                </div>

                <div className="col-6">
                  <div className="stageTitle">Farm Stage Summary</div>
                  <div className="row">
                    <div className="col-6"><Chart aspect={2/1} title="Temperature Against Time"/></div>
                    <div className="col-6"><Chart aspect={2/1} title="Humidity Against Time"/></div>
                    <div className="col-6"><Chart aspect={2/1} title="CO2 Against Time"/></div>
                    observation images

                  </div>
                </div>
              </div>

              
            
            </div>
          </div>
        </div>
        
      </Sidebar>
      
    </div>
  )
}
