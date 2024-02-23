import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminStatus,
  getAllUsers,
  getChatStatus,
  getChats,
  obtainAllUsers,
  obtainUserChats,
} from "../../redux/AdminSlice";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import socket from "../../socket/socket";
import { jwtDecode } from "jwt-decode";
import EachUser from "../../components/EachUser";

const Chats = ({ setShowNav, messages, setMessages, setInitial }) => {
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const adminStatus = useSelector(getAdminStatus);
  const userChats = useSelector(getChats);
  const chatStatus = useSelector(getChatStatus);

  const [oldUserId, setOldUserId] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [userId, setUserId] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [adminId, setAdminId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    dispatch(obtainAllUsers());

    const decryptToken = jwtDecode(localStorage.getItem("token"));
    if (decryptToken._id) {
      setAdminId(decryptToken._id);
    }
  }, [dispatch]);

  const userConnectHandler = (userId) => {
    setInitial(true);
    setSelectedUser(userId);
    setMessages({
      userId: "",
      userMessages: [{ socketId: "", message: "" }],
    });
    dispatch(obtainUserChats(userId));
    if (oldUserId) {
      socket.emit("leaveOldChatRoom", oldUserId);
    }
    socket.emit("connectToUser", userId);
    setOldUserId(userId);
    setUserId(userId);
  };

  useEffect(() => {
    if (userId) {
      setShowMessages(userId === messages.userId);
    }
  }, [userId, messages]);

  const sendMessageToUserHandler = () => {
    socket.emit("sendMessage", adminMessage, userId, socket.id, adminId);
    setAdminMessage("");
  };

  useEffect(() => {
    return () => {
      setShowMessages(false);
    };
  }, []);

  // console.log("Show Messages", showMessages);
  // console.log("UserId", userId);
  console.log(messages);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div
        className="text-3xl text-fuchsia-700 pb-10"
        onClick={() => {
          setShowNav((prevNav) => !prevNav);
        }}
      >
        <button>
          <FaBars />
        </button>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-1">
        <div className="lg:col-span-2 bg-fuchsia-300 p-2 h-[80vh] overflow-y-scroll relative">
          <div className="px-4 font-semibold text-2xl bg-fuchsia-800 py-2 text-white">
            <h2>Users</h2>
          </div>
          <div className="mt-3">
            {adminStatus !== "loading" &&
              allUsers.users.length !== 0 &&
              allUsers.users.map((eachUser, index) => {
                let fullName = eachUser.firstName.concat(
                  " ",
                  eachUser.lastName
                );

                return (
                  <EachUser
                    key={index}
                    fullName={fullName}
                    eachUser={eachUser}
                    selectedUser={selectedUser}
                    userConnectHandler={userConnectHandler}
                    messages={messages}
                  />
                );
              })}
          </div>
          {adminStatus !== "loading" && allUsers.length === 0 && (
            <div>No users to message</div>
          )}
          {adminStatus === "loading" && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Spin />
            </div>
          )}
        </div>
        <div className="lg:col-span-5 bg-white pt-4 h-[80vh] relative">
          <div className="text-center italic font-medium border-b border-gray-300 pb-3">
            <h2>All Chats are visible here</h2>
          </div>
          {!userId && (
            <div className="text-xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <span>Please select user for Chatting...</span>
            </div>
          )}
          <div className="p-4 overflow-y-scroll h-[85%]">
            {chatStatus !== "loading" &&
              userId &&
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
                      chats.userId === adminId ? "justify-end" : "justify-start"
                    }`}
                    key={index}
                  >
                    <div
                      className={`${
                        chats.userId !== adminId
                          ? "bg-fuchsia-300"
                          : "bg-gray-300"
                      } p-3 text-left lg:w-[40%] mt-3`}
                    >
                      <span>{chats.message}</span>
                    </div>
                  </div>
                );
              })}
            {showMessages &&
              userId &&
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
                      } p-3 text-left lg:w-[40%] mt-3`}
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
          {userId && (
            <div className="absolute bottom-0 w-full">
              <div className="flex sticky bottom-0 w-full items-center">
                <div className="w-full shadow-[0px_0px_5px] shadow-[rgba(0,0,0,0.1)]">
                  <input
                    type="text"
                    id="message"
                    name="message"
                    className="border border-gray-300 w-full h-10 text-black p-4"
                    placeholder="Enter your message here..."
                    value={adminMessage}
                    onChange={(event) => setAdminMessage(event.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-fuchsia-400 px-12 h-10 hover:bg-fuchsia-300"
                    onClick={sendMessageToUserHandler}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
          {chatStatus === "loading" && (
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Spin />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chats;
