import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//
import userService from "../_services/userService";
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

let initialFormValues = {
  customer_id: "",
  doctor_id: "",
  date: "",
  time: "",
};

function NewAppointmentPage() {
  // hooks
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // glogal state hooks
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAdmin = userRole == "admin";
  const isCustomer = userRole == "user";
  const isDoctor = userRole == "doctor";

  if (isCustomer) {
    initialFormValues = {
      customer_id: userInfo.customerId,
      doctor_id: "",
      date: "",
      time: "",
    };
  } else if (isDoctor) {
    initialFormValues = {
      customer_id: "",
      doctor_id: userInfo.doctorId,
      date: "",
      time: "",
    };
  } else {
    initialFormValues = {
      customer_id: "",
      doctor_id: "",
      date: "",
      time: "",
    };
  }

  // useEffect(() => {
  //   getProfile();
  // }, []);

  // handlers

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((oldState) => {
      return {
        ...oldState,
        [name]: value, // key: value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      customer_id: data.get("customer_id"),
      doctor_id: data.get("doctor_id"),
      date: data.get("date"),
      time: data.get("time"),
    });
  };

  const redirect = () => {
    navigate("/users/my-appointments");
  };

  const createAppointment = async () => {
    setIsLoading(true);
    try {
      const data = await userService.createAppointment(token, formValues);
      console.log(data.results);
      setSuccess(true);
      setTimeout(dismissAlert, 5000);
      setTimeout(redirect, 5000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      // console.log("userInfo:", userInfo);
      // console.log("initialFormValues:", initialFormValues);
      // console.log("formValues:", formValues);
      // setTimeout(dismissAlert, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissAlert = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success">
          <AlertTitle>Succes</AlertTitle>
          Appointment created successfully!
        </Alert>
      )}
      <Container component="main" maxWidth="md">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ mt: 1, mb: 4 }}>
            <Typography component="h1" variant="h5">
              New appointment
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 5,
              p: 3,
              borderRadius: 4,
              border: "1px solid #e8e8e8",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack direction="column" spacing={2}>
                  <Select
                    required
                    fullWidth
                    id="customer_id"
                    label="Customer"
                    name="customer_id"
                    autoComplete="given-name"
                    value={formValues.customer_id}
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={8}>Terrill</MenuItem>
                  </Select>
                  <Select
                    required
                    fullWidth
                    id="doctor_id"
                    label="Doctor"
                    name="doctor_id"
                    autoComplete="family-name"
                    value={formValues.doctor_id}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Manuel</MenuItem>
                  </Select>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack direction="column" spacing={2}>
                  <TextField
                    required
                    fullWidth
                    id="date"
                    label="Date"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    InputProps={{
                      inputProps: {
                        type: "date",
                      },
                    }}
                  />

                  <TextField
                    required
                    fullWidth
                    id="time"
                    label="Hour"
                    name="time"
                    value={formValues.time}
                    onChange={handleChange}
                    InputProps={{
                      inputProps: {
                        type: "time",
                      },
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to="/users/my-appointments"
                >
                  <Button type="button" variant="contained" sx={{ mt: 3 }}>
                    Cancel
                  </Button>
                </NavLink>
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<SaveRoundedIcon />}
                  sx={{ mt: 3 }}
                  onClick={() => {
                    createAppointment(formValues);
                  }}
                >
                  Create appointment
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default NewAppointmentPage;
