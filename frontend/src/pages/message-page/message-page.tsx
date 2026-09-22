import { useState, useEffect } from "react";
import { socket } from "../../Apis/message-api";
import { useAuth } from "../../components/ContextProvider";

export default function MessagePage() {
  const [messages, setMessages] = useState<string[]>();
  const { user } = useAuth();

  const userName = user?.name;

  useEffect(() => {
    socket.connect();
    socket.on("room", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [
        ...(prevMessages || []),
        "Received : " + message,
      ]);
    });

    return () => {
      socket.disconnect();
      socket.off("room");
    };
  }, []);

  async function handleSendMessage(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const messageInput = e.currentTarget.querySelector("textarea");
    const message = messageInput?.value;

    if (message) {
      socket.emit("message", userName + ": " + message);

      setMessages((prevMessages) => [
        ...(prevMessages || []),
        "Send : " + message,
      ]);
      messageInput.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold absolute top-40 left-10">
        Message Page
      </h1>

      <div className="relative">
        <div className="border border-gray-300 rounded-md p-4 mb-4 w-96 h-64 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Messages</h2>
          {messages?.map((message, index) => (
            <div key={index} className="mb-2">
              {message}
            </div>
          ))}
        </div>
      </div>

      <div>
        <form
          onSubmit={handleSendMessage}
          className="flex flex-col items-center"
        >
          <textarea
            className="border border-gray-300 rounded-md p-2 w-96"
            placeholder="Enter your message"
          ></textarea>
          <button
            className="border mt-2 bg-green-400 rounded p-2"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
