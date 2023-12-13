import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import Typography from "components/Typography";
import { Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  useAddNewConversationMutation,
  useAddNewMessageMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useGetUserByEmailQuery,
} from "state/api";
import Conversation from "components/conversations/Conversation";
import Message from "components/message/Message";

const Chat2 = () => {
  const socket = useRef();
  const scrollRef = useRef();
  const userEmail = useSelector((state) => state.global.userEmail);
  const { data, isLoading, isSuccess } = useGetUserByEmailQuery(userEmail);
  const [nullify, setNullify] = useState(null);
  const [userId, setUserId] = useState("");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const conversationsQuerey = useGetConversationsQuery(userId);
  const [currentChatClicked, setCurrentChatClicked] = useState(false);
  const messagesQuerey = useGetMessagesQuery(currentChat ? currentChat._id : null);
  const [addNewMessage] = useAddNewMessageMutation();
  const [addNewConversation] = useAddNewConversationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };
  };

  useEffect(() => {
    arrivalMessage && currentChat
      ? currentChat.members.includes(arrivalMessage.sender)
      : setNullify(null);
    arrivalMessage && currentChat
      ? setMessages((prev) => [...prev, arrivalMessage])
      : setNullify(null);
  }, [arrivalMessage, currentChat, messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setUserId(data.id);
    }
  }, [isSuccess]);

  useEffect(() => {

  }, [currentChatClicked]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontWeight: 600,
              marginTop: 2,
              marginBottom: 2,
              mx: "1rem",
            }}
            variant="h5"
            className="header-message"
          >
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper}>
        <Grid item xs={3}>
          <List>
            <ListItem key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt=""
                  src={
                    data && data.profile
                      ? data.profile.profile_image
                      : "Loading"
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={data ? data.full_name : "Loading"}
              ></ListItemText>
            </ListItem>
          </List>
          <Divider />
          {/* <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid> */}
          <Divider />
          {conversationsQuerey.data ? (
            conversationsQuerey.data.map((c) => (
              <div
                onClick={() => {
                  setCurrentChat(c);
                  setCurrentChatClicked(true);
                }}
              >
                <Conversation conversation={c} currentUser={userId} />
              </div>
            ))
          ) : (
            <></>
          )}
        </Grid>
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            flex={1}
        >
          <Grid
            display={"flex"}
            sx={{
              height: "70vh",
            }}
            item
            xs={9}
          >
            {currentChatClicked ? (
              <Box>
                {messagesQuerey.data ? (
                  messagesQuerey.data.map((m, index) => (
                    <Box ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === userId}
                        key={index + 1}
                      />
                    </Box>
                  ))
                ) : (
                  <></>
                )}
              </Box>
            ) : (
              <></>
            )}
            <Divider />
            <Grid alignItems={"end"} container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add">
                  <Send />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default Chat2;
