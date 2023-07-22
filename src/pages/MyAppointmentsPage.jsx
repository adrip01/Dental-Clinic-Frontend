import * as React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import userService from "../_services/userService";

function MyAppointmentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const [appointments, setAppointments] = useState([]);


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



  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "customer_id", headerName: "Customer", width: 130 },
    { field: "doctor_id", headerName: "Doctor", width: 130 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 120,
      valueFormatter: (params) => format(new Date(params.value), "yyyy-MM-dd"),
    },
    {
      field: "time",
      headerName: "Hour",
      width: 120,
    },

    {
      field: "editIcon",
      headerName: "Edit",
      width: 60,
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
      width: 60,
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
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataGrid
          rows={appointments}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      </Paper>
    </Box>
  );
}
export default MyAppointmentsPage;
