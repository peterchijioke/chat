import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [customer, setCustomer] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const goToChat = (e) => {
    e.preventDefault();

    if (!customer || !subject || !email) return;

    navigate("/Chat", {
      state: {
        customer: `${customer}`,
        subject: `${subject}`,
        email: email,
      },
    });
  };
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Live Chart</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setCustomer(event.target.value)}
          />
        </div>
        <div>
          <input
            style={{ marginTop: "1rem" }}
            placeholder="Email"
            className="joinInput"
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Chat Subject..."
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        <button onClick={goToChat} className={"button mt-20"} type="submit">
          Join
        </button>
      </div>
    </div>
  );
};

export default Join;
