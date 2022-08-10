import React, {useEffect ,useState} from 'react'
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { ObservationCarousel } from '../../components/observationCarousel/ObservationCarousel';
import { Icon } from 'semantic-ui-react';
import { farmNavItems } from '../../components/navbar/navbarLists';

export const FarmObservationPage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        
        <Sidebar>
        <Navbar navItems={farmNavItems}/>
        <div className="container">
            <div className="top row">

                <h4 className="pb-2 pt-4"><Icon name="camera" color="black" />Observation images</h4>
                <>
                    <div className="row">
                        <div className="col-md-4 pb-4"><ObservationCarousel type="observe_farm" openModal={handleOpen} rackName="Rack_1" /></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel type="observe_farm" openModal={handleOpen} rackName="Rack_2" /></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel type="observe_farm" openModal={handleOpen} rackName="Rack_3" /></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel type="observe_farm" openModal={handleOpen} rackName="Rack_4" /></div>
                    </div>

                    <div className="row">
                        {/* <div className="col-md-4 pb-4"><ObservationCarousel type="observe_incub" openModal={handleOpen} rackName="Rack_4" meta="Growth Date: 10/06/2022"/></div> */}
                        {/* <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 8" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 9" meta="Growth Date: 10/06/2022"/></div> */}
                    </div>
                </>    
                
         

            </div>
        </div>

        </Sidebar>
    )
}