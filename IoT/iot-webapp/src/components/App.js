import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SensorData from './SensorData';
import Others from './Others';
import Stuff from './stuff';

const App = () => {
    return (
        <div>
        <BrowserRouter>
            <div>
                <Route path="/" exact component={SensorData} />
                <Route path="/others" exact component={Others} />
                <Route path="/stuffs" exact component={Stuff} />
            </div>
        </BrowserRouter>
        </div>
    );
};

export default App;