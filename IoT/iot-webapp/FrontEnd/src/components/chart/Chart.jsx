import React, { useState, useEffect } from 'react'
import { projectRealtimeDb } from '../../config/firebase-config'
import { Link } from 'react-router-dom';
import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,Label } from 'recharts';
import { dateHelper } from '../../utils/dateHelper'

const data1 = [
  {
    timestamp: "Jan",
    temp: 26
  }, 
  {
    timestamp: "Feb",
    temp: 25
   }, 
   {
    timestamp: "Mar",
    temp: 20
   }, 
   {
    timestamp: "April",
    temp: 21
   }, 
   {
    timestamp: "May",
    temp: 19
   }, 
];



export const Chart = ({ aspect, title, color, parameter, location }) => {
  const [data, setData] = useState();
  const [realtimeValue, setRealtimeValue] = useState();
  const renderUnits = (parameter) => {
    if (parameter == "temperature"){
      return (<>°C</>)
    }
    if (parameter == "humidity"){
      return (<>%</>)
    }
    if (parameter == "co2"){
      return (<>ppm</>)
    }
  }
  // run only during first render
  useEffect(() => {
    const dataRef = projectRealtimeDb.ref('ESP32-Incubation-6C96CE57DDC4');
    dataRef.limitToLast(10)
    .on('value', (snapshot) => {
      const datas = snapshot.val();
      console.log(datas) 
      const dataList = [];
      for (let timestamp in datas){
        const oneData = datas[timestamp]
        const timestampConverted = dateHelper(timestamp, "time")
        dataList.push({ [parameter]: oneData[parameter], timestamp: timestampConverted})
        // dataList.push({ [parameter]: oneData[parameter], timestamp})
      }
    //   for (let data in datas) {
    //     // console.log(id)
    //     dataList.push(data.timestamp );
    //   }
    //   console.log(todos)
      setData(dataList);
      // setRealtimeValue(dataList[0].parameter);
      // console.log("hiiiii")
      // console.log(dataList)
      if (dataList){
        // access the last data = latest value!
        // console.log(dataList.slice(-1)[0][[parameter]])
        const realtimeVal = dataList.slice(-1)[0][parameter]
        console.log(realtimeValue)
        setRealtimeValue(realtimeVal)
      }
      
      // console.log(realtimeValue)
    });
  }, []);


  // const optiLevel = ({parameter}) => {
  //   if ({parameter} == "temperature"){
  //     return 24.669
  //   }
  //   else if ({parameter} == "humidity"){
  //     return 81.199
  //   }
  //   else if ({parameter} == "co2"){
  //     return 700
  //   }
  // }
  const renderRefLine = (parameter) => {
    if (parameter == "temperature"){
      return (
        <>
          <ReferenceLine y={25} label="lower: 25.0 °C" stroke="green" alwaysShow/>
          <ReferenceLine y={30} label="upper: 30.0 °C" stroke="green" alwaysShow/>
        </>
      )
    }
    if (parameter == "humidity"){
      return (
        <>
          <ReferenceLine y={85} label="lower: 85 %" stroke="green" alwaysShow/>
          <ReferenceLine y={100} label="upper: 100 %" stroke="green" alwaysShow/>

        </>
        
      )
    }
    if (parameter == "co2"){
      return (
      <>
       <ReferenceLine y={350} label="lower: 350 ppm" stroke="green" alwaysShow />
        <ReferenceLine y={800} label="upper: 1000 ppm" stroke="green" alwaysShow />

      </>
      )
    }
  }

  return (
    <Link to={location} params={{ aspect, title, color, parameter, location}}>
      <div>Latest Value: {realtimeValue} {renderUnits(parameter)}</div>
    <div className='chart'>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={ aspect } styles >
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
        <defs>
          <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>

        {/* <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" /> */}

        <XAxis dataKey="timestamp" stroke='gray' label={{ value: "Time", offset: 0,  position: "insideBottom" }} domain={['auto', 'auto']} />
        {/* <YAxis  domain={['auto', 'auto']}/> */}
        {/* <YAxis style={{margin: "10px"}} label={{ value: parameter, angle: -90, position: 'insideLeft',  }} domain={['auto', 'auto']}/> */}
        <YAxis domain={['auto', 'auto']}>
          <Label value={`${parameter.charAt(0).toUpperCase() + parameter.slice(1)}`} angle="-90" position="insideLeft" className='label'style={{textAnchor:"middle"}}/>
        </YAxis>
      
        <CartesianGrid strokeDasharray="4 4" className='chartGrid'/>
        <Tooltip />

        {/* for temperature */}
        
        {/* <ReferenceLine y={24.669} label="" stroke="green" />
        <ReferenceLine y={24.611} label="" stroke="green" /> */}

        {/* for humidity */}
        {/* <ReferenceLine y={81.05} label="" stroke="green" />
        <ReferenceLine y={81.20} label="" stroke="green" /> */}

        {/* for co2 */}
        {/* <ReferenceLine y={490} label="490" stroke="green" alwaysShow/>
        <ReferenceLine y={1000} label="1000" stroke="green" alwaysShow/> */}
        {renderRefLine(parameter)}

        <Area type="monotone" dataKey={parameter} stroke={color} fillOpacity={.2} fill={color}/>

      </AreaChart>
      </ResponsiveContainer>
      {/* <h3>{optiLevel({parameter})}</h3> */}
    </div>
    </Link>
  )
}