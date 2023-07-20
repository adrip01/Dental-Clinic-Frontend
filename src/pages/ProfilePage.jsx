import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import { Container, Typography } from "@mui/material";
import userService from "../_services/userService";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";

import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const initialFormValues = {
  user_first_name: "",
  user_last_name: "",
  email: "",
};

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    setFormValues({
      user_first_name: user.results?.user_first_name || "",
      user_last_name: user.results?.user_last_name || "",
      email: user.results?.email || "",
    });
  }, [user]);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getProfile(token);
      setUser(data);
      setFormValues({
        user_first_name: data.user_first_name,
        user_last_name: data.user_last_name,
        email: data.email,
      });
      console.log(data);
      console.log(user);
      console.log(formValues);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Typography variant="body1">Cargando...</Typography>
      ) : (
        <Card
          variant="outlined"
          sx={{
            margin: "auto",
            marginTop: 20,
            minWidth: 275,
            maxWidth: 350,
            alignItems: "center",
          }}
        >
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    {`${formValues.user_first_name} ${formValues.user_last_name}`}
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Email: ${formValues.email}`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <NavLink style={{ textDecoration: "none" }} to="/account">
              <Button size="small">EDIT PROFILE</Button>
            </NavLink>
          </CardActions>
        </Card>
      )}
    </>
  );
}
