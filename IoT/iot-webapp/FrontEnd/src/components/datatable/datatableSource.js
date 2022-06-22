import React, { useState, useEffect} from 'react'
import axios from "axios";

export const userCol = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    
  ];

  export const taskColumns = [
    { field: "_id", headerName: "ID", width: 10 },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 200,
    },
    {
      field: "taskDescr",
      headerName: "Task Description",
      width: 300,
    },
    {
      field: "assignedByUser",
      headerName: "Assigned By",
      width: 100,
    },
    {
      field: "dateAssigned",
      headerName: "Date Assigned",
      width: 120,
    },
    {
      field: "dateDue",
      headerName: "Date Due",
      width: 120,
    },
    {
      field: "completionStatus",
      headerName: "Completion Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.completionStatus}`}>
            {params.row.completionStatus}
            
          </div>
        );
      },
    },
    
  ];
  
  // export const taskRows = [
  //   {
  //     id: 1,
  //     taskname:"Rack movement",
  //     taskDescr:"Move Rack 1.23 into Farm space",
  //     status:"completed",
  //     assignee:"Benji",
  //     dateAssigned:"04/05/2022",
  //     dateOverdue:"12/05/2022",
  //   },
  //   {
  //     id: 2,
  //     taskname:"Rack movement",
  //     taskDescr:"Move Rack 1.23 into Farm space",
  //     status:"issues",
  //     assignee:"self",
  //     dateAssigned:"04/05/2022",
  //     dateOverdue:"12/05/2022",
  //   },
  //   {
  //     id: 3,
  //     taskname:"Rack movement",
  //     taskDescr:"Move Rack 1.23 into Farm space",
  //     status:"overdue",
  //     assignee:"self",
  //     dateAssigned:"04/05/2022",
  //     dateOverdue:"12/05/2022",
  //   },
  //   {
  //     id: 4,
  //     taskname:"Room cleanliness",
  //     taskDescr:"Move Rack 1.23 into Farm space",
  //     status:"completed",
  //     assignee:"Steph",
  //     dateAssigned:"04/05/2022",
  //     dateOverdue:"12/05/2022",
  //   },
  //   {
  //     id: 5,
  //     taskname:"Harvesting",
  //     taskDescr:"Move Rack 1.23 into Farm space",
  //     status:"issues",
  //     assignee:"Sze Jia",
  //     dateAssigned:"04/05/2022",
  //     dateOverdue:"12/05/2022",
  //   },
  // ]





  //temporary data
  // export const userRows = [
  //   {
  //     id: 1,
  //     username: "Snow",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     status: "completed",
  //     email: "1snow@gmail.com",
  //     age: 35,
  //   },
  //   {
  //     id: 2,
  //     username: "Jamie Lannister",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "2snow@gmail.com",
  //     status: "overdue",
  //     age: 42,
  //   },
  //   {
  //     id: 3,
  //     username: "Lannister",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "3snow@gmail.com",
  //     status: "issues",
  //     age: 45,
  //   },
  //   {
  //     id: 4,
  //     username: "Stark",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "4snow@gmail.com",
  //     status: "completed",
  //     age: 16,
  //   },
  //   {
  //     id: 5,
  //     username: "Targaryen",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "5snow@gmail.com",
  //     status: "overdue",
  //     age: 22,
  //   },
  //   {
  //     id: 6,
  //     username: "Melisandre",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "6snow@gmail.com",
  //     status: "completed",
  //     age: 15,
  //   },
  //   {
  //     id: 7,
  //     username: "Clifford",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "7snow@gmail.com",
  //     status: "overdue",
  //     age: 44,
  //   },
  //   {
  //     id: 8,
  //     username: "Frances",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "8snow@gmail.com",
  //     status: "completed",
  //     age: 36,
  //   },
  //   {
  //     id: 9,
  //     username: "Roxie",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "snow@gmail.com",
  //     status: "issues",
  //     age: 65,
  //   },
  //   {
  //     id: 10,
  //     username: "Roxie",
  //     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     email: "snow@gmail.com",
  //     status: "completed",
  //     age: 65,
  //   },
  // ];