import "./index.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import ResponsiveAppBar from "components/Appbar";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMessagesQuery,
  useGetUserByEmailQuery,
  useGetUserIdQuery,
  useGetUserQuery,
} from "state/api";
import { useLocation } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import { Fab, Grid, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

export default function Chat() {
  const location = useLocation();
  const sellerId = location.state ? location.state.seller.id : null;
  const userEmail = useSelector((state) => state.global.userEmail);
  const { data, isLoading, isSuccess } = useGetUserByEmailQuery(userEmail);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userId, setUserId] = useState("");
  const [currentChatClicked, setCurrentChatClicked] = useState(false);
  const messagesQuerey = useGetMessagesQuery(
    currentChat ? currentChat._id : null
  );
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (isSuccess && !isLoading) setUserId(data.id);
  }, [data]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setUserId(data.id);
    }
  }, [isSuccess]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat
      ? currentChat.members.includes(arrivalMessage.sender)
      : null && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, messages]);

  useEffect(() => {
    if (currentChatClicked) {
      if (messagesQuerey.isSuccess) {
        setMessages(messagesQuerey.data);
      }
    }
  }, [currentChatClicked]);

  // const waitFunction = async () => {
  //   if (userId === "") {
  //     console.log("waiting for user id");
  //     const x = await waitFor(userId !== "");
  //   }
  // }

  useEffect(() => {
    // waitFunction()
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/conversations/" + userId
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/messages/" + currentChat
            ? currentChat._id
            : null
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:5001/messages/addnewmessage",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const findConversationElseCreateNew = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/conversations/find/${userId}/${sellerId}`
      );
      setCurrentChat(res.data);
      if (currentChat === null) {
        const newConversation = {
          userId,
          sellerId,
        };
        const res = await axios.post(
          "http://localhost:5001/conversations/addnewconversation",
          newConversation
        );
        setCurrentChat(res.data);
      }
      socket.current.emit("addUser", userId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (conversations.length === 0) {
      findConversationElseCreateNew();
    }
  }, [conversations]);

  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search Conversation"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div
                onClick={() => {
                  setCurrentChat(c);
                  setCurrentChatClicked(true);
                }}
              >
                <Conversation conversation={c} currentUser={userId} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  {/* <Grid item xs={11}> */}
                  <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  {/* </Grid> */}
                  {/* <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                  ></textarea> */}
                  {/* <button */}
                  <Grid xs={1} align="right">
                    <Fab
                      color="primary"
                      aria-label="add"
                      className="chatSubmitButton"
                      onClick={handleSubmit}
                    >
                      <Send />
                    </Fab>
                  </Grid>
                  {/* Send */}
                  {/* </button> */}
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Select conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
