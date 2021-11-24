/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import addMinutes from 'date-fns/addMinutes'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axiosService from '../services/httpHelper'

const TrainingCalendar = () => {
	const [agenda, setAgenda] = useState([])

	const trainingListUrl = 'https://customerrest.herokuapp.com/gettrainings'
	const locales = {
		'en-US': enUS,
	}
	const localizer = dateFnsLocalizer({
		format,
		parseISO,
		startOfWeek,
		getDay,
		locales,
	})

	useEffect(() => {
		fetchTrainings()
	}, [])

	const fetchTrainings = () => {
		axiosService
			.getAll(trainingListUrl)
			.then(response => response.data)
			.then(trainings => {
				return (
					setAgenda(
						trainings.map((training, index) => ({
							id: index,
							title: training.activity + ' with ' + training.customer.lastname + ', ' + training.customer.firstname,
							start: parseISO(training.date),
							end: addMinutes((new Date(training.date)), training.duration)
						}))
					)
				)

			})
			.catch(err => console.log(err))
	}
	console.log(agenda)

	return (
		<div>
			<Calendar
				localizer={localizer}
				events={agenda}
				startAccessor="start"
				endAccessor="end"
				style={{ height: '90vh' }}
				defaultDate={new Date()}
				defaultView='month'
        
			/>
		</div>
	)
}


export default TrainingCalendar
