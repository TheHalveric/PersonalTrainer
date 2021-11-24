/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import axiosService from '../services/httpHelper'
import AddCustomerForm from './AddCustomerForm'
import EditCustomerForm from './EditCustomerForm'
import AddTrainingForm from './AddTrainingForm'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import { CSVLink } from 'react-csv'

const CustomerList = () => {
	const [customers, setCustomers] = useState([])
	const [open, setOpen] = useState(false)
	const [msg, setMsg] = useState('')

	const customersUrl = 'https://customerrest.herokuapp.com/api/customers'
	const trainingsUrl = 'https://customerrest.herokuapp.com/api/trainings'

	useEffect(() => {
		fetchCustomers()
	}, [])

	const fetchCustomers = () => {
		axiosService
			.getAll(customersUrl)
			.then(response => {
				if (response.status === 200) {
					setCustomers(response.data.content)
				} else {
					alert('Error')
				}
			})
			.catch(error => console.error(error))
	}

	const handleClose = () => {
		setOpen(false)
	}

	const addCustomer = (customer) => {
		axiosService
			.create(customersUrl, customer)
			.then(response => {
				if (response.status === 201) {
					console.log(response.data)
					fetchCustomers()
				} else {
					alert('Error')
				}
			})
			.catch(error => console.error(error))
	}

	const editCustomer = (url, customer) => {
		axiosService
			.update(url, customer)
			.then(response => {
				if (response.status === 200) {
					setMsg('New information added')
					setOpen(true)
					fetchCustomers()
				} else {
					alert('Error')
				}
			})
			.catch(error => console.error(error))
	}

	const deleteCustomer = (url) => {
		if (window.confirm('Delete this customer?')) {
			axiosService
				.remove(url)
				.then(response => {
					if (response.status === 204) {
						setMsg('Customer deleted')
						setOpen(true)
						fetchCustomers()
					} else {
						alert('Error')
					}
				})
				.catch(error => console.error(error))
		}
	}

	const addTraining = (training) => {
		axiosService
			.create(trainingsUrl, training)
			.then(response => {
				if (response.status === 201) {
					setMsg('Training added')
					setOpen(true)
				} else {
					alert('Error')
				}
			})
			.catch(error => console.error(error))
	}

	const columns = [
		{ field: 'firstname', headerName: 'First Name', sortable: true, filter: true, width: 150 },
		{ field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 150 },
		{ field: 'streetaddress', headerName: 'Address', sortable: true, filter: true },
		{ field: 'postcode', headerName: 'Post Code', sortable: true, filter: true, width: 150 },
		{ field: 'city', sortable: true, filter: true, width: 150 },
		{ field: 'email', headerName: 'E-mail', sortable: true, filter: true },
		{ field: 'phone', sortable: true, filter: true, width: 150 },
		{
			headerName: '',
			sortable: false,
			filter: false,
			width: 130,
			field: '',
			cellRendererFramework: (params) => <AddTrainingForm row={params} addTraining={addTraining} />
		},
		{
			headerName: '',
			sortable: false,
			filter: false,
			width: 100,
			field: 'links[1].href',
			cellRendererFramework: (params) => <EditCustomerForm row={params} editCustomer={editCustomer} />
		},
		{
			headerName: '',
			sortable: false,
			filter: false,
			width: 50,
			field: 'links[1].href',
			cellRendererFramework: (params) => (
				<DeleteOutlineSharpIcon
					color='error'
					onClick={() => deleteCustomer(params.data.links[1].href)}
				/>
			)
		},
	]

	//CSV data
	const headers = columns.map(column => column.field)
	headers.splice(7, 9)
	const data = customers

	return (
		<div>
			<AddCustomerForm addCustomer={addCustomer} />
			<div className='ag-theme-material' style={{ marginTop: 20, height: 600, width: '99%', margin: 'auto' }}>
				<AgGridReact
					rowData={customers}
					columnDefs={columns}
					pagination={true}
					paginationPageSize={10}
				>
				</AgGridReact>
			</div>
			<Button
				variant='outlined'
			>
				<CSVLink data={data} headers={headers} style={{ textDecoration: 'none', color: '#2196f3' }}>
          Download Contacts
				</CSVLink>
			</Button>
			<Snackbar
				open={open}
				message={msg}//we can use state for message to show different messages at diff places, eg. errors
				autoHideDuration={4000}
				onClose={handleClose}
			/>
		</div>
	)
}

export default CustomerList