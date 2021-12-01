import { React, useEffect, useState } from 'react'
import axiosService from '../services/httpHelper'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Label } from 'recharts'
import _ from 'lodash'

const Statistics = () => {
  const trainingListUrl = 'https://customerrest.herokuapp.com/gettrainings'

  const [data, setData] = useState([])

  useEffect(() => {
    fetchTrainings()
  }, [])

  const fetchTrainings = () => {
    axiosService
      .getAll(trainingListUrl)
      .then(response => response.data)
      .then(data => formatData(data))
      .then(stats => setData(stats))
      .catch(err => console.log(err))
  }

  const formatData = (data) => {
    let stats = _(data).groupBy('activity')
      .map((objs, key) => ({
        activity: key,
        duration: _.sumBy(objs, 'duration')
      }))
      .value()
    return stats
  }
  console.log(data, typeof data)
  return (
    <div>
      <BarChart margin={{ bottom: 20, left: 20, top: 20 }} width={700} height={500} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='activity' >
          <Label value="Trainings" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} name='Duration (min)' />
        <Tooltip />
        <Bar name='Duration (min)' dataKey='duration' fill="#8884d8" />
      </BarChart>
    </div>
  )
}

export default Statistics