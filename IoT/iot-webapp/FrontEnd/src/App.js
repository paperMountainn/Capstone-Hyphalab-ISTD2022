import React, {useState} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import LandingPage from './pages/landingPage/LandingPage';
import { Home } from './pages/home/Home';
import { FarmSummary } from './pages/farmSummary/FarmSummary';
// import { ParamDetail } from './pages/paramDetail/ParamDetail';
// import { IncubationDetail } from './pages/incubationDetail/IncubationDetail';
import { IncubTempDetail } from './pages/incubTempDetail/IncubTempDetail';
import { IncubHumDetail } from './pages/incubHumDetail/IncubHumDetail';
import { FarmTempDetail } from './pages/farmTempDetail/FarmTempDetail';
import { FarmHumDetail } from './pages/farmHumDetail/FarmHumDetail';
import { FarmCo2Detail } from './pages/farmCo2Detail/FarmCo2Detail';
import { IncubationSummary } from './pages/incubationSummary/IncubationSummary';
import { RackPhases } from './pages/rackPhases/RackPhases';
import { NewPhaseForm } from './pages/newPhaseForm/NewPhaseForm';
import { RackCycles } from './pages/rackCycles/RackCycles';
import { RacksAll } from './pages/racksAll/RacksAll';
import { RackDetail } from './pages/rackDetail/RackDetail';
import { OperatorTasks } from './pages/operatorTasks/OperatorTasks';
import { OperatorDetailPage } from './pages/operatorDetailPage/OperatorDetailPage';
import { EngineerDetailPage } from './pages/engineerDetailPage/EngineerDetailPage';
import { AssignTasks } from './pages/assignTasks/AssignTasks';
import { EngineerTasks } from './pages/engineerTasks/EngineerTasks';
import { Contaminations } from './pages/contaminations/Contaminations';
import { LoginForm } from './pages/loginForm/LoginForm';
// import { Observations } from './pages/observations/Observations';
import { IncubObservationPage } from './pages/incubObservationPage/IncubObservationPage';
import { FarmObservationPage } from './pages/farmObservationPage/FarmObservationPage';
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
import { ParamRtdb } from './pages/dbtest/ParamRtdb';

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
                        {/* <Route path="hi">
                            <Route index element={<LandingPage />}/>
                        </Route> */}
                        {/* <Sidebar /> */}
                        <Route path="farm">
                            {/* /users render list */}
                            <Route index element={<FarmSummary />} />
                            {/* /users/adfasd renders Single */}
                            <Route path="temperature" element={<FarmTempDetail />} />
                            {/* /users/new renders New */}
                            <Route path="humidity" element={<FarmHumDetail />} />
                            <Route path="co2" element={<FarmCo2Detail />} />
                            <Route path="observations" element={<FarmObservationPage />} />
                        </Route>
                        <Route path="incubation">
                            {/* /users render list */}
                            <Route index element={<IncubationSummary />} />
                            {/* /users/adfasd renders Single */}
                            <Route path="temperature" element={<IncubTempDetail />} />
                            {/* /users/new renders New */}
                            <Route path="humidity" element={<IncubHumDetail />} />
                            <Route path="contaminations" element={<Contaminations />} />
                            <Route path="observations" element={<IncubObservationPage />} />
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
                            <Route path="paramRTDB" element={<ParamRtdb />} />
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
                        {/* <Route path="login">
                            <Route index element={<LoginForm 
                                                    title="Login"
                                                    setEmail={setEmail}
                                                    setPassword={setPassword}
                                                    handleAction={() => handleAction(1)}
                                                    />} />
                        </Route> */}
                        <Route path="register">
                            <Route index element={<LoginForm title="Register"
                                                            setEmail={setEmail}
                                                            setPassword={setPassword}
                                                            handleAction={() => handleAction(2)}
                                                            />} />
                        </Route>
                        {/* <Route path="user">
                            <Route index element={<UserProfile />} />
                        </Route>
                        <Route path="settings">
                            <Route index element={<Settings />} />
                        </Route> */}
                    </Route>
                </Routes>
        </BrowserRouter>
        </div>
    );
};

export default App;