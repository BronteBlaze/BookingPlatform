import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const EachUser = ({
  eachUser,
  selectedUser,
  fullName,
  userConnectHandler,
  messages,
}) => {
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (messages.userId === eachUser._id) {
      setNotify(true);
    }
  }, [messages, eachUser]);

  return (
    <div
      className={`border-t p-4 my-2 cursor-pointer hover:bg-fuchsia-200 ${
        selectedUser === eachUser._id ? "bg-fuchsia-200" : ""
      }`}
      onClick={() => userConnectHandler(eachUser._id)}
    >
      <div className="flex items-center justify-between">
        <span>{fullName}</span>
        {notify && (
          <span className="text-2xl">
            <IoMdNotificationsOutline />
          </span>
        )}
      </div>
    </div>
  );
};

export default EachUser;
