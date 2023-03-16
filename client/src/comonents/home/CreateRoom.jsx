import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
let socket = null;

const CreateRoom = () => {
  const inputEl = useRef();
  const ENDPOINT = "http://localhost:5000";
  useEffect(() => {
    socket = io(ENDPOINT);
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);

  function handleSubmit(event) {
    event.preventDefault();
    socket.emit("create-room", inputEl.current.value);
    inputEl.current.value = null;
  }
  return (
    <Paper elevation={24} sx={{ p: 1 }}>
      <Typography variant="h5" component="h1">
        Create Room
        <Divider sx={{ mb: 2, mr: 20, mt: 1 }} />
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          inputRef={inputEl}
          id="room-name"
          label="Room Name"
          variant="outlined"
          name="roomName"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="outlined" type="submit">
          Create Room
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateRoom;
