import { Fragment, useEffect, useState } from "react";
import NavBar from "../layouts/NavBar";
import MobileNavbar from "../layouts/MobileNavbar";
import socket from "../socket/socket";
import { jwtDecode } from "jwt-decode";
import { getChatStatus, obtainUserChats } from "../redux/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../redux/AdminSlice";
import { Spin } from "antd";

const ChattingPage = ({ messages }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [showMessages, setShowMessages] = useState("");

  const userChats = useSelector(getChats);
  const chatStatus = useSelector(getChatStatus);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    if (decodedToken) {
      socket.emit("connectToAdmin", decodedToken._id);
      setUserId(decodedToken._id);
    }
  }, []);

  const sendMessageToAdminHandler = () => {
    socket.emit("sendMessage", message, userId, socket.id, userId);
    setMessage("");
  };

  useEffect(() => {
    if (userId) {
      setShowMessages(userId === messages.userId);
    }
  }, [userId, messages]);

  useEffect(() => {
    if (userId) {
      dispatch(obtainUserChats(userId));
    }
  }, [userId, dispatch]);

  console.log(userChats);

  // console.log(socket.id);
  return (
    <Fragment>
      <NavBar />
      <MobileNavbar />
      <div className="lg:absolute lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] xl:w-[60%] lg:w-[80%] mt-12">
        <div className="grid lg:grid-cols-7 grid-cols-1">
          <div className="lg:col-span-2 bg-fuchsia-300 p-2 lg:h-[80vh] overflow-y-scroll">
            <div className="px-4 font-semibold text-2xl bg-fuchsia-800 py-2 text-white">
              <h2>Chat With Admin</h2>
            </div>
            <div className="mt-3 border-t">
              <div className="border-b py-3 cursor-pointer hover:bg-fuchsia-200">
                <span className="px-4">Admin</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white pt-4 h-[80vh] relative">
            <div className="text-center italic font-medium border-b border-gray-300 pb-3">
              <h2>All Chats are visible here</h2>
            </div>
            <div className="p-4 overflow-y-scroll h-[85%]">
              {chatStatus !== "loading" &&
                userChats &&
                userChats.length !== 0 &&
                userChats.map((chats, index) => {
                  if (
                    chats.message ===
                    messages.userMessages[messages.userMessages.length - 1]
                      .message
                  ) {
                    return <div key={index} className="hidden"></div>;
                  }
                  return (
                    <div
                      className={`flex ${
                        chats.userId === userId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      key={index}
                    >
                      <div
                        className={`${
                          chats.userId !== userId
                            ? "bg-fuchsia-300"
                            : "bg-gray-300"
                        }  p-3 text-left lg:w-[40%] mt-3`}
                      >
                        <span>{chats.message}</span>
                      </div>
                    </div>
                  );
                })}
              {showMessages &&
                messages.userMessages.length !== 0 &&
                messages.userMessages.map((eachMessage, index) => {
                  return (
                    <div
                      className={`flex ${
                        eachMessage.socketId === socket.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      key={index}
                    >
                      <div
                        className={`${
                          eachMessage.socketId !== socket.id
                            ? "bg-fuchsia-300"
                            : "bg-gray-300"
                        }  p-3 text-left lg:w-[40%] mt-3`}
                      >
                        <span>{eachMessage.message}</span>
                      </div>
                    </div>
                  );
                })}
              {chatStatus !== "loading" &&
                userId &&
                userChats &&
                userChats.length === 0 &&
                !messages.userMessages[0].socketId && (
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
                    Start messaging by saying hello...
                  </div>
                )}
            </div>
            <div className="absolute bottom-0 w-full">
              <div className="flex w-full items-center">
                <div className="w-full shadow-[0px_0px_5px] shadow-[rgba(0,0,0,0.1)]">
                  <input
                    type="text"
                    id="message"
                    name="message"
                    className="border border-gray-300 w-full h-10 text-black p-4"
                    placeholder="Enter your message here..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </div>
                <div className="" onClick={sendMessageToAdminHandler}>
                  <button
                    type="button"
                    className="bg-fuchsia-400 px-12 h-10 hover:bg-fuchsia-300"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
            {chatStatus === "loading" && (
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <Spin />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChattingPage;
