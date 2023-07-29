import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
//
import userService from "../_services/userService";
import { NavLink, useNavigate } from "react-router-dom";

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
  const [customers, setCustomers] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // glogal state hooks
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.userInfo.role);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAdmin = userRole == "admin";
  const isCustomer = userRole == "user";
  const isDoctor = userRole == "doctor";

  // console.log(userInfo);

  useEffect(() => {
    if (isCustomer) {
      setFormValues((oldState) => ({
        ...oldState,
        customer_id: userInfo.customerId,
      }));
    } else if (isDoctor) {
      setFormValues((oldState) => ({
        ...oldState,
        doctor_id: userInfo.doctorId,
      }));
    }
    // console.log(formValues);
  }, []);

  useEffect(() => {
    if (isCustomer) {
      getDoctors();
    } else if (isDoctor) {
      getCustomers();
    } else if (isAdmin) {
      getCustomers();
      getDoctors();
    }
  }, []);

  const getCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getCustomers(token);
      setCustomers(data.customers);
      console.log(data.customers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDoctors = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getDoctors(token);
      setDoctors(data.doctors);
      console.log(data.doctors);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      console.log(data);
      setSuccess(true);
      setTimeout(dismissAlert, 5000);
      setTimeout(redirect, 5000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      console.log("userInfo:", userInfo);
      console.log("initialFormValues:", initialFormValues);
      console.log("formValues:", formValues);
      setTimeout(dismissAlert, 5000);
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
                  {isCustomer ? (
                    <Select
                      required
                      fullWidth
                      id="customer_id"
                      label="Customer"
                      name="customer_id"
                      autoComplete="given-name"
                      value={formValues.customer_id}
                      onChange={handleChange}
                      disabled
                    >
                      <MenuItem value={userInfo.customerId}>
                        {userInfo.name} {userInfo.lastName}
                      </MenuItem>
                    </Select>
                  ) : (
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
                      {customers.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                          {`${customer.user.user_first_name} ${customer.user.user_last_name}`}
                        </MenuItem>
                      ))}
                    </Select>
                  )}

                  {isDoctor ? (
                    <Select
                      required
                      fullWidth
                      id="doctor_id"
                      label="Doctor"
                      name="doctor_id"
                      autoComplete="family-name"
                      value={formValues.doctor_id}
                      onChange={handleChange}
                      disabled
                    >
                      <MenuItem value={userInfo.doctorId}>
                        {userInfo.name} {userInfo.lastName}
                      </MenuItem>
                    </Select>
                  ) : (
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
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.id}>
                          {`${doctor.user.user_first_name} ${doctor.user.user_last_name} (${doctor.speciality.speciality})`}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
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
