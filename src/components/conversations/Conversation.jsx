import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const userId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:5001/user/id/" + userId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user && user.profile ? user.profile.profile_picture : "nil"}
        alt=""
      />
      <span className="conversationName">
        {user && user.first_name ? user.first_name : "Loading"}
      </span>
    </div>
  );
}
