import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const Chat = () => {
  const [socket] = useState(() => io(":5000"));
  let [flag] = useState(true);

  const getChatContainer = async () => {
    document.getElementById("chatContainer").style.display = "none";
  };

  const getBroadcast = async () => {
    socket.once("message", (data) => {
      if (flag) {
        let broadcast = document.createElement("p");
        broadcast.style.fontSize = "17px";
        broadcast.textContent = data;
        document.getElementById("messageList").appendChild(broadcast);
        flag = false;
      }
    });
    flag = true;
  };

  useEffect(() => {
    getChatContainer();
    getBroadcast();
  }, []);

  const loginButton = (e) => {
    e.preventDefault();
    document.getElementById("chatContainer").style.display = "block";
    document.getElementById("messageList").style.height = "350px";
    document.getElementById("messageList").style.overflow = "auto";
    document.getElementById("loginButton").style.display = "none";
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (document.getElementById("message").value !== "") {
      socket.emit("message", document.getElementById("message").value);
      let chatList = document.createElement("p");
      chatList.style.textAlign = "right";
      chatList.style.fontSize = "17px";
      chatList.textContent = document.getElementById("message").value;
      document.getElementById("messageList").appendChild(chatList);
      document.getElementById("messageList").scrollTop =
        document.getElementById("messageList").scrollHeight;
      document.getElementById("message").value = "";
    } else {
      alert("Please enter a message");
    }
  };
  return (
    <>
      {/* // navbar bulma css */}
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-menu">
          <div className="navbar-start m-auto">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/chat" className="navbar-item">
              Chat
            </Link>
          </div>
        </div>
      </nav>

      <hr className="block" />

      {/* // join bulma css */}
      <div className="container">
        <div className="columns">
          <form className="column is-3" id="loginForm">
            <div className="box">
              <div className="field">
                <div className="control">
                  <input
                    type="submit"
                    className="button is-success is-fullwidth"
                    value="Join Diskusi"
                    id="loginButton"
                    onClick={loginButton}
                  />
                </div>
              </div>
            </div>
          </form>
          {/* // chat bulma css */}
          <div className="column is-9">
            <div className="box">
              <div className="field hero" id="chatContainer">
                <label className="label">Message</label>
                <form className="control hero-head" id="chatForm">
                  <div id="messageList" className="textarea"></div>
                  <div className="block"></div>
                  <div className="columns">
                    <div className="column is-10">
                      <input
                        type="text"
                        className="input"
                        placeholder="Tulisan pesan ..."
                        id="message"
                      />
                    </div>
                    <div className="column is-2">
                      <div className="field">
                        <div className="control">
                          <input
                            type="submit"
                            className="button is-info is-fullwidth"
                            value="Send"
                            size="3"
                            id="sendMessage"
                            onClick={sendMessage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
