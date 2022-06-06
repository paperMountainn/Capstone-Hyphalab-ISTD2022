import React from 'react'
import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    date: "Jan",
    temp: 26
  }, 
  {
    date: "Feb",
    temp: 25
   }, 
   {
    date: "Mar",
    temp: 20
   }, 
   {
    date: "April",
    temp: 21
   }, 
   {
    date: "May",
    temp: 19
   }, 
];

export const Chart = ({ aspect, title }) => {
  return (
    <div className='chart'>
      <div className="title">{title}</div>
      {/* height is half of width */}
      <ResponsiveContainer width="100%" aspect={ aspect }>
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient> */}
        </defs>
        <XAxis dataKey="date" stroke='gray' />
        <YAxis />
        {/* put stroke color changes in css file because we are going to change our theme  */}
        <CartesianGrid strokeDasharray="3 3" className='chartGrid'/>
        <Tooltip />
        <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#temp)" />
        {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#temp)" /> */}
      </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}