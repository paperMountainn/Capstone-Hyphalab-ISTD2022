import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { mainPageNavItems } from '../../components/navbar/navbarLists';
import './home.scss';
import { RiTempHotLine } from "react-icons/ri";
import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { Icon, Popup, Button, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { HomeContamImgCarousel } from '../../components/homeContamImgCarousel/HomeContamImgCarousel';
import { HomeObservationImgCarousel } from '../../components/homeObservationImgCarousel/HomeObservationImgCarousel';
const COLORS = {
  temp: '#8884d8',
  humidity: '#0088FE',
  co2: '#82ca9d'
}


export const Home = () => {
  // console.log("home")
  return (
    <div>
      <Sidebar>
        {/* <div className="homeContainer"> */}
          <Navbar navItems={mainPageNavItems}/>
            <div className='ms-4'>
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
              <h4 className="pb-2 pt-4">
                <GiMushroomGills className='icon'/>
                {' '}Incubation Area Summary &nbsp;
                <Popup header={
                <h5>
                  
                  <GiMushroomGills className='icon'/>&nbsp;
                  Incubation Area 
                  
                </h5>
                  } wide position='bottom left' 
                  content=
                  {<>
                  {/* <p>The incubation area monitors 3 growth parameters: </p> */}
                  <List>
                  <p>The <b>incubation area</b> is where we wait for mycelium (mushroom roots!) to spread for 1 week.</p>
                  <p>We monitor 2 essential growth parameters with <i>real-time interactive graphs</i>. <Icon name="line graph"/></p>
                  <p><RiTempHotLine /> Temperature / °C</p>
                  <p><Icon name="cloud"/> Humidity / %</p>
                  <p>Hover over to see the values! <Icon loading name="hand pointer outline"/></p>
                  <hr />
                  <p>Click <Icon name="hand pointer outline"/>on the graphs to go to the details page of a specific growth parameter.</p>
                
                
                  </List>
                  
                  </>}
                  trigger={<Button icon='info' circular color="brown" inverted size="mini"/>} 
                />
              </h4>
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
                    
                    <h5 className='pb-2 pt-2'>
                      <Icon name="camera" className='icon'/>Contamination Images &nbsp;
                      <Popup header={
                      <h5>
                  
                  <Icon name="camera"/>&nbsp;
                  Contamination Observation 
                  
                  </h5>
                      } wide="very" position='bottom left' 
                      content=
                      {<>
                      {/* <p>The incubation area monitors 3 growth parameters: </p> */}
                      <List>
                      <p>The <b>contamination images</b> shows contaminated samples in the incubation area. </p>
                      <p>During the <b>incubation stage</b>, the samples are <b>most susceptible</b> to contamination. </p>
                      <p>Contaminations are usually <span style={{color:"green"}}>green</span> in color. It is crucial that we remove them timely to prevent their spread!</p>
                      <hr />
                      <p>Click on <Link to="#">View Images <Icon name="magnify"/></Link>to check the contaminated samples!</p>
                      <p>To toggle between different Racks, click on the <Link to="#"><b>&lt;</b></Link> and <Link to="#"><b>&gt;</b></Link> arrows.</p>
                      <p>For more details, visit the <Link to="#">Observation Page<Icon name="arrow alternate circle right"/></Link>.</p>
                    
                    
                      </List>
                      
                      </>}
                      trigger={<Button icon='info' circular color="brown" inverted size="mini"/>} 
                    />
                    </h5>
                    
                  </div>
                  {/* <MyCarousel /> */}

                  <HomeContamImgCarousel />
                </div>                
                </MDBCol>
                <MDBCol lg='6'>
                <div >
                  <div className='pt-4'>
                  <h5 className='pb-2 pt-2'>
                    <Icon name="camera" className='icon'/>

                    Observation Images&nbsp;
                    <Popup header={
                      <h5>
                    
                      <Icon name="camera"/>&nbsp;
                      Observation Images
                    
                      </h5>
                      } wide="very" position='bottom left' 
                      content=
                      {<>
                      {/* <p>The incubation area monitors 3 growth parameters: </p> */}
                      <List>
                        <p>Observation images are akin to CCTV images.
                        It is important that we have <b>real-time</b> observation of what is going on in the incubation area.
                        </p>

                        <p>The images in <b>Rack_2</b> are what we will expect to see during the incubation stage - Fluffy white mycelium roots are spreading throughout the sample. There might be some pinning (little mushroom buds <GiMushroomGills className='icon'/>) as well.</p>
                        <p>You might find yourself in <b>Rack_1</b>! <Icon name='smile outline'/></p>
                        

                        <hr />
                        <p>Click on <Link to="#">View Images <Icon name="magnify"/></Link>to check the images.</p>
                        <p>To toggle between different Racks, click on the <Link to="#"><b>&lt;</b></Link> and <Link to="#"><b>&gt;</b></Link> arrows.</p>
                        <p>For more details, visit the <Link to="#">Observation Page <Icon name="arrow alternate circle right"/></Link>.</p>
                      
                    
                      </List>
                      
                      </>}
                      trigger={<Button icon='info' circular color="brown" inverted size="mini"/>} 
                    />
                  </h5>
                  </div>
                  <HomeObservationImgCarousel type="observe_incub"/>
                </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBCol xl='6'>
              <h4 className="pb-2 pt-4">
              <GiMushroomsCluster className='icon'/>
              {' '}Fruiting Area Summary&nbsp;
              <Popup header={
                <h5>
                  
                  <GiMushroomsCluster className='icon'/>&nbsp;
                  Fruiting Area 
                  
                </h5>
                  } wide position='bottom left' 
                  content=
                  {<>
                  {/* <p>The incubation area monitors 3 growth parameters: </p> */}
                  <List>
                  <p>The <b>fruiting area</b> is where we wait for mushrooms to grow big and become ready to be harvested! It takes around 2 weeks.</p>
                  <p>We monitor 3 essential growth parameters with <i>real-time interactive graphs</i>  to maximise yield and minimise time of growth. <Icon name="line graph"/></p>
                  <p><RiTempHotLine /> Temperature / °C</p>
                  <p><Icon name="cloud"/> Humidity / %</p>
                  <p><Icon name="cloudsmith"/> CO<sub>2</sub> / %</p>
                  <p>Hover over to see the values! <Icon loading name="hand pointer outline"/></p>
                  <hr />
                  <p>Click <Icon name="hand pointer outline"/>on the graphs to go to the details page of a specific growth parameter.</p>
                
                
                  </List>
                  
                  </>}
                  trigger={<Button icon='info' circular color="brown" inverted size="mini"/>} 
                />

              </h4>
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
                <div className="pt-5"><Chart aspect={2/1} title="CO2 vs Time" color={COLORS.co2} parameter="co2" location="/farm/humidity"/></div>
                </MDBCol>
                <MDBCol lg='6'>
                <div>
                <div className='pt-4'>
                
                <h5 className='pb-2 pt-2'>
                    <Icon name="camera" className='icon'/>

                    Observation Images&nbsp;
                    <Popup header={
                      <h5>
                    
                      <Icon name="camera"/>&nbsp;
                      Observation Images
                    
                      </h5>
                      } wide="very" position='bottom left' 
                      content=
                      {<>
                      {/* <p>The incubation area monitors 3 growth parameters: </p> */}
                      <List>
                        <p>Observation images are akin to CCTV images.
                        It is important that we have <b>real-time</b> observation of what is going on in the fruiting area.
                        </p>

                        <p>The images in <b>Rack_2</b> are what we will expect to see during the farming/fruiting stage - little mushrooms are already growing! <GiMushroomsCluster className='icon'/></p>
                        <p>You might find yourself in <b>Rack_1</b>! <Icon name='smile outline'/></p>
                        

                        <hr />
                        <p>Click on <Link to="#">View Images <Icon name="magnify"/></Link>to check the images.</p>
                        <p>To toggle between different Racks, click on the <Link to="#"><b>&lt;</b></Link> and <Link to="#"><b>&gt;</b></Link> arrows.</p>
                        <p>For more details, visit the <Link to="#">Observation Page <Icon name="arrow alternate circle right"/></Link>.</p>
                      
                    
                      </List>
                      
                      </>}
                      trigger={<Button icon='info' circular color="brown" inverted size="mini"/>} 
                    />
                  </h5>
                  </div>
                  <HomeObservationImgCarousel type="observe_farm"/>
                </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>

        
      </div>
      </Sidebar>

      
      
    </div>
  )
}
