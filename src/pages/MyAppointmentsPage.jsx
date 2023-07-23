import * as React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import userService from "../_services/userService";
import { NavLink } from "react-router-dom";

function MyAppointmentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const [appointments, setAppointments] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getAppointments(token);
      setAppointments(data.appointments);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRow = (id) => {
    setDeleteId(id);
    setOpenConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmation(false);
    try {
      await userService.deleteAppointment(token, deleteId);
      getAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmation(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 190,
    },
    { field: "customer_id", headerName: "Customer", width: 210 },
    { field: "doctor_id", headerName: "Doctor", width: 210 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 205,
      valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"),
    },
    {
      field: "time",
      headerName: "Hour",
      width: 205,
    },

    {
      field: "editIcon",
      headerName: "Edit",
      width: 205,
      renderCell: (params) => (
        <Box>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleEditRow(params.row.id)}
          />
        </Box>
      ),
    },
    {
      field: "deleteIcon",
      headerName: "Delete",
      width: 205,
      renderCell: (params) => (
        <Box>
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteRow(params.row.id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <NavLink style={{ textDecoration: "none" }} to="/users/new-appointment">
        <Button type="button" variant="contained" sx={{ m: 3 }}>
          New appointment
        </Button>
      </NavLink>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataGrid
          rows={appointments}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      </Paper>
      <Dialog
        open={openConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this appointment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this appointment? There's no going
            back if you do.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default MyAppointmentsPage;
