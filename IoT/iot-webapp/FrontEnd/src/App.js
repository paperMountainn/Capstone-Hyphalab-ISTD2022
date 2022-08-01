// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import SensorData from './SensorData';
// import Stuff from './stuff';
// import Dashboard from './pages/Dashboard';
// import Temp from './pages/Temp';
// import Humid from './pages/Humid';
// import Light from './pages/Light';
// import Camera from './pages/Camera';
// import Navbar from './common/Navbar';
// import SideBar from './common/SideBar';
// import { sideBarFarmList } from './common/sideBarFarmList';
// import Form from './Form';


// const App = () => {
//     const farmRoutes = () => {
//         return (
//             <div>
//                 <Navbar />
//                 <SideBar sideBarList={sideBarFarmList} >
//                     <Route path="/farm" exact component={Dashboard} />
//                     <Route path="/farm/temp" exact component={Temp} />
//                     <Route path="/farm/humid" exact component={Humid} />
//                     <Route path="/farm/light" exact component={Light} />
//                     <Route path="/farm/cam" exact component={Camera} />

//                     <Route path="/stuffs" exact component={Stuff} />
//                     <Route path="/form" exact component={Form} />
//                 </SideBar >
//             </div>
//         );
//     }
//     return (
//         <Router>
//             <Switch>
              
//                 {/* <Route path="/farm" exact component={Dashboard} />
//                 <Route path="/farm/temp" exact component={SensorData} />
//                 <Route path="/farm/humid" exact component={SensorData} />
//                 <Route path="/farm/light" exact component={SensorData} />
//                 <Route path="/farm/cam" exact component={SensorData} /> */}
//                 <Route component={farmRoutes} />
          
                
//                 <Route path="/incub/humid" exact component={SensorData} />
//                 <Route path="/incub/temp" exact component={SensorData} />
//                 <Route path="/incub/cam" exact component={SensorData} />
//                 <Route path="/incub/contam" exact component={SensorData} />
                
//             </Switch>
//         </Router>
//     );
// };

// export default App;

// // import React, { Component } from 'react';
// // // import logo from './logo.svg';
// // // import './App.css';

// // class App extends Component {
// // state = {
// //     data: null
// //   };

// //   componentDidMount() {
// //     this.callBackendAPI()
// //       // .then(res => this.setState({ data: "hi" }))
// //       // .catch(err => console.log(err));
// //   }
// //     // fetching the GET route from the Express server which matches the GET route from server.js
// //   callBackendAPI = async () => {
// //     const response = await fetch('/express_backend');
// //     const body = await response.text();
    

// //     if (response.status !== 200) {
        
// //       throw Error(body.message) 
// //     }
// //     console.log(body)
// //     this.setState({data: body})
// //     return body;
// //   };

// //   render() {
// //     return (
// //       <div className="App">
// //         <header className="App-header">
// //         </header>
// //         <h1>{this.state.data}</h1>
// //       </div>
// //     );
// //   }
// // }

// // export default App;

import React, {useState} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import { Home } from './pages/home/Home';
import { FarmSummary } from './pages/farmSummary/FarmSummary';
import { ParamDetail } from './pages/paramDetail/ParamDetail';
import { IncubationSummary } from './pages/incubationSummary/IncubationSummary';
import { RackPhases } from './pages/rackPhases/RackPhases';
import { NewPhaseForm } from './pages/newPhaseForm/NewPhaseForm';
import { RackCycles } from './pages/rackCycles/RackCycles';
import { RacksAll } from './pages/racksAll/RacksAll';
import { RackDetail } from './pages/rackDetail/RackDetail';
import { Sidebar } from 'semantic-ui-react';
import { OperatorTasks } from './pages/operatorTasks/OperatorTasks';
import { OperatorDetailPage } from './pages/operatorDetailPage/OperatorDetailPage';
import { EngineerDetailPage } from './pages/engineerDetailPage/EngineerDetailPage';
import { AssignTasks } from './pages/assignTasks/AssignTasks';
import { EngineerTasks } from './pages/engineerTasks/EngineerTasks';
import { Contaminations } from './pages/contaminations/Contaminations';
import { LoginForm } from './pages/loginForm/LoginForm';
import { Observations } from './pages/observations/Observations';
import { Settings } from './pages/settings/Settings';
import { UserProfile } from './pages/userProfile/UserProfile';

// dbtests
import { MyForm } from './pages/dbtest/Form';
import { TodoList } from './pages/dbtest/TodoList';
import { PutImg } from './pages/dbtest/PutImg';
import { PutImg2 } from './pages/dbtest/PutImg2';
import { MyButton } from './pages/reacttest/button/Button';
import { DataRetrieve } from './pages/dbtest/DataRetrieve';
import { MongoTry } from './pages/mongotry/MongoTry';
import { MongoTryPhases } from './pages/mongotry/MongoTryPhases';
import { CountDown } from './pages/mongotry/CountDown';
import { TestFlask } from './pages/dbtest/TestFlask';

// import * as firebase from 'firebase/app';
// import { app } from './config/firebase-config-steph';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const handleAction = (id) => {
    console.log(id)
    
}

// const handleAction = (id) => {
//     console.log(id)
//     const authentication = getAuth();
//     if (id === 2) {
//         createUserWithEmailAndPassword(authentication, email, password)
//             .then((response) => {
//                 console.log(response)
//             })
//     }
// }

const App = () => {
const [username, setEmail] = useState('');
const [password, setPassword] = useState('');
    return (
        <div className='App'> 
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />}></Route>
                        {/* <Sidebar /> */}
                        <Route path="farm">
                            {/* /users render list */}
                            <Route index element={<FarmSummary />} />
                            {/* /users/adfasd renders Single */}
                            <Route path="temperature" element={<ParamDetail />} />
                            {/* /users/new renders New */}
                            <Route path="humidity" element={<ParamDetail />} />
                            <Route path="co2" element={<ParamDetail />} />
                            <Route path="observations" element={<Observations />} />
                        </Route>
                        <Route path="incubation">
                            {/* /users render list */}
                            <Route index element={<IncubationSummary />} />
                            {/* /users/adfasd renders Single */}
                            <Route path="temperature" element={<ParamDetail />} />
                            {/* /users/new renders New */}
                            <Route path="humidity" element={<ParamDetail />} />
                            <Route path="contaminations" element={<Contaminations />} />
                            <Route path="observations" element={<Observations />} />
                        </Route>
                        <Route path="rack">
                            {/* /products render list */}
                            <Route index element={<RackPhases />} />
                            
                            {/* <Route path="new" element={<NewPhaseForm />} /> */}
                            <Route path="racks-all" element={<RacksAll />} />
                            {/* /products/adfasd renders Single */}
                            <Route path="rack-cycles" element={<RackCycles />} />
                            {/* /products/new renders New */}
                            
                            {/* <Route path=":rackId" element={<RackDetail />} /> */}
                        </Route>
                        <Route path="operator">
                            <Route path="my-tasks" element={<OperatorTasks/>} />
                            <Route path="profile" element={<OperatorDetailPage/>} />
                        </Route>

                        <Route path="engineer">
                            
                            <Route index path="assign-tasks" element={<AssignTasks/>} />   
                            <Route index path="my-tasks" element={<EngineerTasks/>} />   
                            <Route index path="profile" element={<EngineerDetailPage/>} />   
                            
                        </Route>
                        {/* test db */}
                        <Route path="dbtest">
                            <Route index element={<MyForm/>} />
                            <Route path="todolist" element={<TodoList/>} />
                            <Route path="putimg" element={<PutImg/>} />
                            <Route path="putimg2" element={<PutImg2/>} />
                            <Route path="retrieveData" element={<DataRetrieve/>} />
                            <Route path="testFlask" element={<TestFlask />} />
                        </Route>
                        <Route path="reacttest">
                            <Route index element={<MyButton label="click me"/>} />
                            {/* <Route path="testButton" element={<TodoList/>} /> */}
                        </Route>

                        {/* test mongodb */}
                        <Route path="mongoTry">
                            <Route index element={<MongoTry />} />
                            <Route path="phase" element={<MongoTryPhases />} />
                            <Route path="count-down" element={<CountDown />} />
                            {/* <Route path="testButton" element={<TodoList/>} /> */}
                        </Route>
                        <Route path="login">
                            <Route index element={<LoginForm 
                                                    title="Login"
                                                    setEmail={setEmail}
                                                    setPassword={setPassword}
                                                    handleAction={() => handleAction(1)}
                                                    />} />
                        </Route>
                        <Route path="register">
                            <Route index element={<LoginForm title="Register"
                                                            setEmail={setEmail}
                                                            setPassword={setPassword}
                                                            handleAction={() => handleAction(2)}
                                                            />} />
                        </Route>
                        <Route path="user">
                            <Route index element={<UserProfile />} />
                        </Route>
                        <Route path="settings">
                            <Route index element={<Settings />} />
                        </Route>
                    </Route>
                </Routes>
        </BrowserRouter>
        </div>
    );
};

export default App;