import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import AlertSnackbar from './AlertSnackBar';

const AddDialog = ({ open, setOpen, refresh }) => {
  const [alertOpen, setAlertOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: ""
  })

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    const res = await (await fetch(`http://localhost:3000/contacts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })).json()
    console.log(res)
    setOpen(false)
    setAlertOpen(true)
    refresh()
  };

  const handleUpdate = (field) => (e) => {
    const delta = {}
    delta[field] = e.target.value
    setFormData({ ...formData, ...delta })
  }

  return (
    <>
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Add Contact"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} direction="column" sx={{ paddingTop: 1 }}>
          <Stack spacing={2} direction="row" sx={{ display: "flex" }}>
            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={handleUpdate("firstName")}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={handleUpdate("lastName")}
              sx={{ width: "100%" }}
            />
          </Stack>
          <TextField
            label="Email"
            value={formData.email}
            onChange={handleUpdate("email")}
            sx={{ width: "100%" }}
          />
          <TextField
            label="Phone"
            value={formData.phone}
            onChange={handleUpdate("phone")}
            sx={{ width: "100%" }}
          />
          <TextField
            label="Company"
            value={formData.company}
            onChange={handleUpdate("company")}
            sx={{ width: "100%" }}
          />
          <TextField
            label="Job Title"
            value={formData.jobTitle}
            onChange={handleUpdate("jobTitle")}
            sx={{ width: "100%" }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Stack>
      </DialogActions>
    </Dialog>
    <AlertSnackbar open={alertOpen} setOpen={setAlertOpen} message={`Added ${formData.firstName} ${formData.lastName} successfully`} />
    </>
  );
}

export default AddDialog