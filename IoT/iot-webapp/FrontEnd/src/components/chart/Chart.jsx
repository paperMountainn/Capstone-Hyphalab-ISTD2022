import React, { useState, useEffect } from 'react'
import { projectRealtimeDb } from '../../config/firebase-config'
import { Link } from 'react-router-dom';
import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
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



export const Chart = ({ aspect, title, color, parameter }) => {
  const [data, setData] = useState();
  const [realtimeValue, setRealtimeValue] = useState();
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
      console.log("hiiiii")
      // console.log(dataList)
      if (dataList){
        // access the last data = latest value!
        // console.log(dataList.slice(-1)[0][[parameter]])
        const realtimeVal = dataList.slice(-1)[0][parameter]
        setRealtimeValue(realtimeVal)
      }
      
      console.log(realtimeValue)
    });
  }, []);

  // Chart.defaultProps = {
  //   parameter: "nothing",
  //   data: data
  // }
  // if (parameter == null){
  //   setData(data1)
  //   parameter = "temp"
  // } 
  console.log("hi")
  console.log(color)
  // console.log(realtimeValue && realtimeValue)
  
  // function optimalValue() {
  //   if (parameter == "temperature"){
  //     optimalValue = 23;
  //   }
  //   else if (parameter == "co2"){
  //     optimalValue = 400
  //   }
  //   else {
  //     optimalValue = 87.40
  //   }
  // }
  return (
    <Link to="/" params={{ aspect, title, color, parameter}}>
      <div>{realtimeValue}</div>
    <div className='chart'>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={ aspect } styles >
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="timestamp" stroke='gray' label={{ value: "time", offset: 0,  position: "insideBottom" }} domain={['auto', 'auto']} />
        {/* <YAxis  domain={['auto', 'auto']}/> */}
        <YAxis style={{margin: "10px"}} label={{ value: parameter, angle: -90, position: 'insideLeft' }} domain={['auto', 'auto']}/>
      
        <CartesianGrid strokeDasharray="3 3" className='chartGrid'/>
        <Tooltip />
        {/* <ReferenceLine y={optimalValue()} label="Optimal" stroke="green" /> */}
        <Area type="monotone" dataKey={parameter} stroke={color} fillOpacity={.2} fill={color}/>

      </AreaChart>
      </ResponsiveContainer>
    </div>
    </Link>
  )
}