import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({}) => {
  const [customer, setCustomer] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [platform, setPlatform] = useState("");
  const [users, setUsers] = useState([]);
  const ENDPOINT = "localhost:9000";
  const { state } = useLocation();

  useEffect(() => {
    const { customer, subject, email, platform } = state;
    console.log("================================", state);

    socket = io(ENDPOINT);
    setSubject(subject);
    setCustomer(customer);
    setEmail(email);
    setPlatform(platform);
    const data = {
      customer,
      subject,
      email,
      platform_url: "https://packmateindustries.com/",
    };

    socket.emit("join", data, (error) => {
      if (error) {
        alert(error.message);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, state]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (text) {
      socket.emit("sendMessage", { message: text }, () => setText(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={subject} />
        <Messages messages={messages} name={customer} />
        <Input message={text} setMessage={setText} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;
