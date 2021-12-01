/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { format } from 'date-fns'
import axiosService from '../services/httpHelper'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp'
import Snackbar from '@mui/material/Snackbar'

const TrainingList = () => {
  const [trainings, setTrainings] = useState([])
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  const trainingListUrl = 'https://customerrest.herokuapp.com/gettrainings'
  const trainingsUrl = 'https://customerrest.herokuapp.com/api/trainings'

  useEffect(() => {
    fetchTrainings()
  }, [])

  const fetchTrainings = () => {
    axiosService
      .getAll(trainingListUrl)
      .then(response => {
        if (response.status === 200) {
          setTrainings(response.data)
        } else {
          alert('Error')
        }
      })
      .catch(error => console.error(error))
  }

  const handleClose = () => {
    setOpen(false)
  }

  const customerNameValueGetter = (trainings) => {
    return `${trainings.data.customer.firstname} ${trainings.data.customer.lastname}`
  }

  const dateValueGetter = (trainings) => {
    const formattedDate = format(new Date(trainings.data.date), 'dd MMM yyyy HH:mm')
    return formattedDate
  }

  const deleteTraining = (id) => {
    if (window.confirm('Delete this customer?')) {
      axiosService
        .remove(`${trainingsUrl}/${id}`)
        .then(response => {
          if (response.status === 204) {
            setMsg('Training deleted')
            setOpen(true)
            fetchTrainings()
          } else {
            alert('Error')
          }
        })
        .catch(error => console.error(error))
    }
  }

  const columns = [
    { valueGetter: dateValueGetter, headerName: 'Date', sortable: true, filter: true },
    { field: 'duration', headerName: 'Duration (min)', sortable: true, filter: true },
    { field: 'activity', sortable: true, filter: true },
    { valueGetter: customerNameValueGetter, headerName: 'Customer', sortable: true, filter: true },
    {
      headerName: '',
      sortable: false,
      filter: false,
      width: 50,
      field: 'links[1].href',
      cellRendererFramework: (params) => (
        <DeleteOutlineSharpIcon
          color='error'
          onClick={() => deleteTraining(params.data.id)}
        />
      )
    },
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
      <Snackbar
        open={open}
        message={msg}//we can use state for message to show different messages at diff places, eg. errors
        autoHideDuration={4000}
        onClose={handleClose}
      />
    </div>
  )
}

export default TrainingList