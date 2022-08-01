import React from 'react'

export const userCol = [
    { field: "id", headerName: "ID", width: 1 },
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
    { field: "_id", headerName: "ID", width: 1, hide: true },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 100,
    },
    {
      field: "taskDescr",
      headerName: "Task Description",
      width: 200,
    },
    {
      field: "assignedBy",
      headerName: "Assigned By",
      width: 100,
    },
    {
      field: "createdOn",
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
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.completionStatus}`}>
            {params.row.completionStatus}
            
          </div>
        );
      },
    },
    
  ];
  
