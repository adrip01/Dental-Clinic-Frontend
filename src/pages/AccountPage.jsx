import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

const initialFormValues = {
  user_first_name: "",
  user_last_name: "",
  email: "",
  birthday: "",
  phone_number: "",
  // password: "",
  // verify_password: "",
};

function AccountPage() {
  // hooks
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState(initialFormValues);

  // glogal state hooks
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getProfile();
  }, []);

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
      user_first_name: data.get("user_first_name"),
      user_last_name: data.get("user_last_name"),
      email: data.get("email"),
      birthday: data.get("birthday"),
      phone_number: data.get("phone_number"),
    });
  };

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile(token);
      setUser(data.results);
      setFormValues({
        user_first_name: data.results.user_first_name,
        user_last_name: data.results.user_last_name,
        email: data.results.email,
        birthday: format(new Date(data.results.birthday), "yyyy-MM-dd"),
        phone_number: data.results.phone_number,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ mt: 1, mb: 4 }}>
            <AccountCircleRoundedIcon
              sx={{ fontSize: 90, color: "primary.light" }}
            />

            <Typography component="h1" variant="h5">
              Account
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
                  <TextField
                    autoComplete="given-name"
                    name="user_first_name"
                    required
                    fullWidth
                    id="user_first_name"
                    label="First Name"
                    autoFocus
                    value={formValues.user_first_name}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    id="user_last_name"
                    label="Last Name"
                    name="user_last_name"
                    autoComplete="family-name"
                    value={formValues.user_last_name}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack direction="column" spacing={2}>
                  <TextField
                    fullWidth
                    id="birthday"
                    label="Birthdate"
                    name="birthday"
                    autoComplete="birtday"
                    value={formValues.birthday}
                    onChange={handleChange}
                    InputProps={{
                      inputProps: {
                        type: "date",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="phone_number"
                    label="Birthdate"
                    name="phone_number"
                    autoComplete="birtday"
                    value={formValues.phone_number}
                    onChange={handleChange}
                  />
                  {/* <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    name="verify-password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="verify-password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  /> */}
                </Stack>
              </Grid>
            </Grid>
            <Grid>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <NavLink style={{ textDecoration: "none" }} to="/users/profile">
                  <Button type="button" variant="contained" sx={{ mt: 3 }}>
                    Cancel
                  </Button>
                </NavLink>
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<SaveRoundedIcon />}
                  sx={{ mt: 3 }}
                >
                  Apply changes
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default AccountPage;
