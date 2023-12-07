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
  useGetUserByEmailQuery,
  useGetUserIdQuery,
  useGetUserQuery,
} from "state/api";
import { useLocation } from "react-router-dom";

export default function Chat() {
  const dispatch = useDispatch();
  const location = useLocation();
  const sellerId = location.state.seller;
  const userEmail = useSelector((state) => state.global.userEmail);
  const user = useGetUserByEmailQuery(userEmail);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userId, setUserId] = useState("");
  // const [sellerId, setSellerId] = useState("");
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (user.isSuccess && !user.isLoading) {
      setUserId(user.data.id);
    }
  }, [user.isSuccess]);

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
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:5001/conversations/" + userId);
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
          "http://localhost:5001/messages/" + currentChat ? currentChat._id : null
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
      const res = await axios.post("http://localhost:5001/messages", message);
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
      const res = await axios.get(`http://localhost:5001/conversations/find/${userId}/${sellerId}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
    if (currentChat === null) {
      const newConversation = {
        sender: userId,
        receiver: sellerId,
      };
      const res = await axios.post("http://localhost:5001/conversations", newConversation);
      setCurrentChat(res.data);
    }
  };

  useEffect(() => {
    while (userId === null) {
      console.log("waiting for user id");
    }
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
            <input placeholder="Search Conversation" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
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
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
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
