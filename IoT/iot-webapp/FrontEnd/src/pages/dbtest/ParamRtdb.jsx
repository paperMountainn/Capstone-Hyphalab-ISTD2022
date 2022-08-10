import React, { useState, useEffect } from 'react'
import { projectRealtimeDb } from '../../config/firebase-config'
import { dateHelper } from '../../utils/dateHelper';
export const ParamRtdb = () => {
    const [data, setData] = useState();
    const [realtimeValue, setRealtimeValue] = useState();
    const two_weeks_ago = Math.floor((new Date('2022', '07', '01').getTime() - 12096e5)/1000);
    const anchor_date1=new Date('2022', '07', '01')
    const anchor_date = Math.floor((new Date('2022', '07', '01').getTime() - anchor_date1.getTimezoneOffset()*60*1000)/1000);
    console.log(anchor_date)
    console.log(two_weeks_ago)
    
    useEffect(() => {
        const dataRef = projectRealtimeDb.ref('ESP32-Incubation-6C96CE57DDC4');
        dataRef.orderByChild('timestamp').startAt(two_weeks_ago.toString()).endAt(anchor_date.toString())
        .on('value', (snapshot) => {
          const datas = snapshot.val();
          console.log("data here")
          console.log(datas) 
          const dataList = [];

          for (let timestamp in datas){
            const oneData = datas[timestamp]
            const timestampConverted = dateHelper(timestamp, "time")
            dataList.push({ ["temperature"]: oneData["temperature"], timestamp: timestampConverted})
            // dataList.push({ [parameter]: oneData[parameter], timestamp})
          }
      
          
          setData(dataList);

          if (dataList){
            // access the last data = latest value!
            // console.log(dataList.slice(-1)[0][[parameter]])
            const realtimeVal = dataList.slice(-1)[0]["temperature"]
            setRealtimeValue(realtimeVal)
          }
          
          
        });
      }, []);
  return (
    <div>
        {console.log(realtimeValue)}
        {console.log(data)}
        
    </div>
  )
}
