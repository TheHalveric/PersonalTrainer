import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AddSharpIcon from '@mui/icons-material/AddSharp'

const AddCustomerForm = (props) => {
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = event => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    props.addCustomer(customer)
    handleClose()
    setCustomer({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      streetaddress: '',
      postcode: '',
      city: ''
    })
  }

  return (
    <div>
      <Button
        style={{ marginTop: 20 }}
        onClick={handleClickOpen}
        variant='outlined'
        startIcon={
          <AddSharpIcon />}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name='firstname'
            value={customer.firstname}
            onChange={handleInputChange}
            label="Firstname"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='lastname'
            value={customer.lastname}
            onChange={handleInputChange}
            label="Surname"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='email'
            value={customer.email}
            onChange={handleInputChange}
            label="Email Address"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='phone'
            value={customer.phone}
            onChange={handleInputChange}
            label="Phone number"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='streetaddress'
            value={customer.streetaddress}
            onChange={handleInputChange}
            label="Street Address"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='postcode'
            value={customer.postcode}
            onChange={handleInputChange}
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='city'
            value={customer.city}
            onChange={handleInputChange}
            label="City"
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

export default AddCustomerForm