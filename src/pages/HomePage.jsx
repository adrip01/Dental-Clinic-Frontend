import React from "react";
import { Container, Grid, Paper, Typography, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="body">
      <Box>
        <Container maxWidth="md">
          <Box>
            <Typography
              variant="h3"
              color="textPrimary"
              sx={{ my: 5, color: "white" }}
            >
              Welcome to our Dental Clinic
            </Typography>
            <Typography
              variant="h5"
              color="textPrimary"
              sx={{ my: 5, color: "white" }}
            >
              We take care of your smile so you can look and feel fantastic. Our
              highly skilled team of dentists is here to provide you with the
              best dental care in a warm and welcoming environment. Your oral
              health is our priority, so come and let us take care of your
              smile. We look forward to welcoming you with open arms.
            </Typography>
            <Box>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large" color="primary">
                  Set an appointment
                </Button>
              </NavLink>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
