/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const AddTrainingForm = (props) => {
	const [open, setOpen] = useState(false)
	const [training, setTraining] = useState({
		date: new Date(),
		activity: '',
		duration: '',
		customer: ''
	})

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleInputChange = event => {
		setTraining({ ...training, [event.target.name]: event.target.value })
	}

	const handleSave = () => {
		const formattedtraining = {
			date: training.date,
			activity: training.activity,
			duration: training.duration,
			customer: props.row.data.links[1].href
		}
		console.log(formattedtraining)
		props.addTraining(formattedtraining)
		handleClose()
		setTraining({
			date: '',
			activity: '',
			duration: '',
			customer: ''
		})
	}

	const formatDate = (date) => {
		setTraining({ ...training, date: date.toISOString() })
	}

	return (
		<div>
			<div>
				<Button
					onClick={handleClickOpen}
					startIcon={
						<AddSharpIcon />}>
          Training
				</Button>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add New Training</DialogTitle>
				<DialogContent>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<div style={{ marginTop: 20 }}>
							<DateTimePicker
								id='date'
								name='date'
								label='Date and Time'
								format='dd.MM.yyyy HH:mm'
								value={training.date}
								onChange={date => formatDate(date)}
								renderInput={(params) => <TextField {...params} />}
								ampm={false}
							/>
						</div>
					</LocalizationProvider>
					<TextField
						margin="dense"
						name='activity'
						value={training.activity}
						onChange={handleInputChange}
						label="Activity"
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name='duration'
						value={training.duration}
						onChange={handleInputChange}
						label="Duration in minutes"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Add</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default AddTrainingForm