import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { user } from "./Home";
import Messages from "../Components/Messages";

const ENDPOINT = "http://localhost:4019/";
let socket;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
      // alert(`${user} connected with socket.io`);
      // console.log(socket);
      socket.emit("joined", { user });

      socket.on("welcome", (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message);
      });

      socket.on("userJoined", (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message);
      });

      socket.on("leave", (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message);
      });

      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    });
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();

    const messageInput = e.target.elements.message;
    const message = messageInput.value;
    socket.emit("message", { message, id });

    messageInput.value = "";
  };

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="mt-10">
      <h1 className="text-center text-2xl font-bold my-4">
        Welcome <span className="text-pink-500">{user}</span>
      </h1>
      <div className="border bg-pink-50 my-3">
        {messages.map((item, i) => (
          <Messages
            user={item.id == id ? "" : item.user}
            key={i}
            message={item.message}
          />
        ))}
      </div>
      <form
        onSubmit={handleMessage}
        className="flex flex-col items-center justify-center gap-3"
      >
        <input
          name="message"
          type="text"
          placeholder="message"
          className="input input-bordered input-success w-full max-w-xs"
        />
        <input className="btn btn-secondary" type="submit" value="Send" />
      </form>
    </div>
  );
}
