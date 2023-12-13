import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./conversation.css";
import { Avatar, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useGetUserIdQuery, useGetUserQuery } from "state/api";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const { data, isLoading, isSuccess} = useGetUserQuery(conversation.members.find((m) => m !== currentUser._id));

  return (
    <React.Fragment>
      <List>
        <ListItem key="RemySharp">
          <ListItemIcon>
            <Avatar
              sx={{
                mr: "1rem",
              }}
              src={data && data.profile ? data.profile.profile_image : "nil"}
              alt=""
            />
          </ListItemIcon>
          <ListItemText >
            {data && data.first_name ? data.first_name : "Loading"}
          </ListItemText>
          <ListItemText secondary="online" align="right"></ListItemText>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
