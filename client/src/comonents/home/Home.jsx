import React from "react";
import { Container, Grid } from "@mui/material";
import CreateRoom from "./CreateRoom";
import RoomList from "./RoomList";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={6}>
          <CreateRoom />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RoomList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
