import './datatable.scss';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState, useEffect} from 'react'
import axios from "axios";
// import { taskColumns, taskRows } from './datatableSource';
import { taskColumns, TaskRowsAPI } from './datatableSource';
import { Link } from 'react-router-dom';

// THIS IS OPERATOR DATATABLE

// these are defined in datatablesource.js
// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     // combine properties in the row
//     // for each row, combine the firstName and lastName
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     // instead of valueGetter, you can use render
//     // render each cell with some react jsx
//     renderCell: (params) => {
//       return (
//         <>
//           <span>{params.row.lastName}</span>
//           <p>{params.row.age}</p>
//         </>
//       );
//     }
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];



export const Datatable = () => {
  // const [data, setData] = useState(taskRows);
  const [taskList, setTaskList] = useState([]);
  const [sampleOperator, setSampleOperator] = useState(null)

  useEffect(() => {
    const fetchOperator = async() => {
      const response1 = await axios.get('/user/operators')
      const op_uid = response1.data[0]._id
      console.log(op_uid)
      setSampleOperator(op_uid)
      const response2 = await axios.get(`/task/${op_uid}/myTasks`) 
      const myTasks = response2.data
      let taskList = []
      for (let task of myTasks){
        console.log(task)
          const {_id, taskName, taskDescr, completionStatus, dateAssigned, dateDue, assignedBy } = task
          taskList.push({id: _id, taskName, taskDescr, completionStatus, dateAssigned, dateDue, assignedBy } )
      }
      setTaskList(taskList)
    }

    fetchOperator()
    
 }, []);


  const handleComplete = async (id) => {
    // for now upon completion is removal from the list, but updates to completed in the be
    // and it will retrieve again if you refresh
    setTaskList(taskList.filter(item => item.id !== id));
    const response = await axios.patch(`user/${id}`, {statusUpdate: "Completed"})
    console.log(response.data)
    
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/:someUserId" style={{ textDecoration:"none"}}>
              <div className='viewButton'>View</div>
            </Link>
            <div className='completeButton' onClick={()=>{handleComplete(params.row.id)}}>Complete</div>
          </div>
        );
      }
    }
  ]

  return (
    <div className='dataTable'>
      <div className="datatableTitle">
        Your tasks
        {/* <Link className="link" to="/users/new" style={{ textDecoration:"none"}}>
          Add New User
        </Link> */}
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          className='datagrid'
          rows={taskList && taskList}
          // concatenate the columns tgt!
          columns={taskColumns.concat(actionColumn)}
          pageSize={7}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <Link className="link" to="/users/new" style={{ textDecoration:"none"}}>
          
        </Link>
      </div>
    </div>
  )
}
