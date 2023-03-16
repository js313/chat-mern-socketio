import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Chat = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Chat {JSON.stringify(user)}</h1>
      <Link to="/">
        <button>Go to home</button>
      </Link>
    </div>
  );
};

export default Chat;
