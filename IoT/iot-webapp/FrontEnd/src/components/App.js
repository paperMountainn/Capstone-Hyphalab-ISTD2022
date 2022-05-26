import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SensorData from './SensorData';
import Stuff from './stuff';
import Dashboard from './pages/Dashboard';
import Temp from './pages/Temp';
import Humid from './pages/Humid';
import Light from './pages/Light';
import Camera from './pages/Camera';
import Navbar from './common/Navbar';
import SideBar from './common/SideBar';
import { sideBarFarmList } from './common/sideBarFarmList';
import Form from './Form';


const App = () => {
    const farmRoutes = () => {
        return (
            <div>
                <Navbar />
                <SideBar sideBarList={sideBarFarmList} >
                    <Route path="/farm" exact component={Dashboard} />
                    <Route path="/farm/temp" exact component={Temp} />
                    <Route path="/farm/humid" exact component={Humid} />
                    <Route path="/farm/light" exact component={Light} />
                    <Route path="/farm/cam" exact component={Camera} />

                    <Route path="/stuffs" exact component={Stuff} />
                    <Route path="/form" exact component={Form} />
                </SideBar >
            </div>
        );
    }
    return (
        <Router>
            <Switch>
              
                {/* <Route path="/farm" exact component={Dashboard} />
                <Route path="/farm/temp" exact component={SensorData} />
                <Route path="/farm/humid" exact component={SensorData} />
                <Route path="/farm/light" exact component={SensorData} />
                <Route path="/farm/cam" exact component={SensorData} /> */}
                <Route component={farmRoutes} />
          
                
                <Route path="/incub/humid" exact component={SensorData} />
                <Route path="/incub/temp" exact component={SensorData} />
                <Route path="/incub/cam" exact component={SensorData} />
                <Route path="/incub/contam" exact component={SensorData} />
                
            </Switch>
        </Router>
    );
};

export default App;

// import React, { Component } from 'react';
// // import logo from './logo.svg';
// // import './App.css';

// class App extends Component {
// state = {
//     data: null
//   };

//   componentDidMount() {
//     this.callBackendAPI()
//       // .then(res => this.setState({ data: "hi" }))
//       // .catch(err => console.log(err));
//   }
//     // fetching the GET route from the Express server which matches the GET route from server.js
//   callBackendAPI = async () => {
//     const response = await fetch('/express_backend');
//     const body = await response.text();
    

//     if (response.status !== 200) {
        
//       throw Error(body.message) 
//     }
//     console.log(body)
//     this.setState({data: body})
//     return body;
//   };

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//         </header>
//         <h1>{this.state.data}</h1>
//       </div>
//     );
//   }
// }

// export default App;