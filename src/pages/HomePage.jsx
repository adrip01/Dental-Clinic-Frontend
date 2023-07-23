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
              Welcome to Dental Clinic
            </Typography>
            <Typography
              variant="h5"
              color="textPrimary"
              sx={{ my: 5, color: "white" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem assumenda ullam, inventore accusamus maiores
              repudiandae rem quam vitae cupiditate cumque optio eos illo
              veritatis repellendus autem eius? Corporis, nihil aliquam!
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
