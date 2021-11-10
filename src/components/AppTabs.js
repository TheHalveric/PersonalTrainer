import React, { useState } from 'react'
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const AppTabs = () => {
  const [value, setValue] = useState('one')

  const handleTabChange = (event, value) => {
    setValue(value)
  }

  return (
    <div>
      <AppBar position='static' color='transparent'>
        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor='primary'
          indicatorColor='primary'
        >
          <Tab value='one' label='Customers' />
          <Tab value='two' label='Trainings' />
        </Tabs>
      </AppBar>

      {value === 'one' && <CustomerList />}
      {value === 'two' && <TrainingList />}
    </div>
  )
}

export default AppTabs