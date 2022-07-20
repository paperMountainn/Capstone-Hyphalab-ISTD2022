import React, {useEffect ,useState} from 'react'
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { ObservationCarousel } from '../../components/observationCarousel/ObservationCarousel';
import { incubationNavItems } from '../../components/navbar/navbarLists';

export const Observations = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        
        <Sidebar>
        <Navbar navItems={incubationNavItems}/>
        <div className="container">
            <div className="top row">

                <h3 className="pb-2 pt-4">Observation images</h3>

                {/* <div className="row">
                <div className="col-md-4 pb-4"><ContamFormModal modalState={open} closeModal={setOpen}/></div>
                </div> */}

                  
                <>
                    <div className="row">
                        <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 4" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 5" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 6" meta="Growth Date: 10/06/2022"/></div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 7" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 8" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ObservationCarousel openModal={handleOpen} header="Rack 9" meta="Growth Date: 10/06/2022"/></div>
                    </div>
                </>    
                
         

            </div>
        </div>

        </Sidebar>
    )
}