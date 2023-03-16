import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import React from "react";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const navigate = useNavigate();

  return (
    <Paper elevation={24} sx={{ p: 1 }}>
      <Typography variant="h5" component="h1">
        Room List
        <Divider sx={{ mb: 2, mr: 20, mt: 1 }} />
      </Typography>
      <ListItemButton onClick={() => navigate("chat/id/name")}>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" secondary="Id" />
      </ListItemButton>
    </Paper>
  );
};

export default RoomList;
