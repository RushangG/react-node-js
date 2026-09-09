import { useState, useEffect } from "react";
import { socket } from "../../Apis/message-api";
import { jwtDecode } from "jwt-decode";
export default function MessagePage() {
  const [messages, setMessages] = useState<string[]>();

  //get the user id from the token
  const token = localStorage.getItem("authToken");
  let userEmail: null;

  if (!token) {
    // console.log("No auth token found in local storage");
  } else {
    const decodedToken: any = jwtDecode(token as string);
    // console.log("decodedToken", decodedToken);

    userEmail = decodedToken?.email;
  }

  useEffect(() => {
    socket.on("room", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [
        ...(prevMessages || []),
        "Received : " + message,
      ]);
    });

    return () => {
      socket.off("room");
    };
  }, []);

  async function handleSendMessage(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const messageInput = e.currentTarget.querySelector("textarea");
    const message = messageInput?.value;

    if (message) {
      socket.emit("message", userEmail + ": " + message);

      setMessages((prevMessages) => [
        ...(prevMessages || []),
        "Send : " + message,
      ]);
      messageInput.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center  justify-center h-screen">
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
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter your message"
          ></textarea>
          <button className="border " type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
