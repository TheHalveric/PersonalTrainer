import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(error => console.error(error))
  }, [])

  const columns = [
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', headerName: 'Surname', sortable: true, filter: true },
    { field: 'streetaddress', headerName: 'Address', sortable: true, filter: true },
    { field: 'postcode', headerName: 'Post Code', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
  ]

  return (
    <div>
      <div className='ag-theme-material' style={{ marginTop: 20, height: 600, width: '99%', margin: 'auto' }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        >
        </AgGridReact>
      </div>
    </div>
  )
}

export default CustomerList