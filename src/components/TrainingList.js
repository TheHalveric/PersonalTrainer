import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { format } from 'date-fns'

const TrainingList = () => {
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(error => console.error(error))
  }, [])

  const customerNameValueGetter = (trainings) => {
    return `${trainings.data.customer.firstname} ${trainings.data.customer.lastname}`
  }

  const dateValueGetter = (trainings) => {
    const formattedDate = format(new Date(trainings.data.date), 'dd MMM yyyy HH:mm')
    return formattedDate
  }

  const columns = [
    { valueGetter: dateValueGetter, headerName: 'Date', sortable: true, filter: true },
    { field: 'duration', headerName: 'Duration (min)', sortable: true, filter: true },
    { field: 'activity', sortable: true, filter: true },
    { valueGetter: customerNameValueGetter, headerName: 'Customer', sortable: true, filter: true },
  ]

  return (
    <div>
      <div className='ag-theme-material' style={{ marginTop: 20, height: 600, width: '100%', margin: 'auto' }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        >
        </AgGridReact>
      </div>
    </div>
  )
}

export default TrainingList