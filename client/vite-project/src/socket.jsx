import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const getSocket=()=>useContext(SocketContext)

const SocketProvier = ({ children }) => {
  const socket = useMemo(
    () =>
      io("https://localhost:3000", {
        withCredentials: true,
        auth: { token : localStorage.getItem("token")},
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export {getSocket,SocketProvier}