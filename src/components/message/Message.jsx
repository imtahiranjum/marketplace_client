import "./message.css";
import { format } from "timeago.js";
import React, { useEffect } from "react";
import {
  useGetSellerByEmailQuery,
  useGetSellerByIdQuery,
  useGetUserByEmailQuery,
} from "state/api";
import { Avatar, Grid, List, ListItem, ListItemText } from "@mui/material";

export default function Message({ message, own, userId, sellerId, key }) {
  // const [userId, setUserId] = useState("");
  // const userEmail = useSelector((state) => state.global.userEmail);
  const { data, isLoading, isSuccess } = useGetSellerByIdQuery(sellerId);

  // useEffect(() => {
  //   if (isSuccess && !isLoading) {
  //     setUserId(data.id);
  //   }
  // }, [isSuccess]);

  return (
    <React.Fragment>
      <List>
        <ListItem key={key}>
          <Grid container>
            <Grid item xs={12}>
              <Avatar
                sx={{
                  mr: "1rem",
                }}
                src={data && data.profile ? data.profile.profile_image : "nil"}
                alt=""
              />
              <ListItemText
                align={own ? "right" : "left"}
                primary={message.text}
              ></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                align={own ? "right" : "left"}
                secondary={format(message.createdAt)}
                sx={{
                  backgroundColor: own ? "#3f51b5" : "#f50057",
                  borderRadius: "50",
                }}
              ></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
