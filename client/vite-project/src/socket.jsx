import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvier = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
      transports: [ "websocket","polling"],
      auth: { token: localStorage.getItem("token") },
    });

    newSocket.on("connect", () => {
      console.log("✅ Connected:", newSocket.id);
      setSocket(newSocket);
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("❌ Disconnected:", reason);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Connection Error:", error.message);
    });

    return () => {
      console.log("🛑 Cleaning up socket connection...");
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { getSocket, SocketProvier };
