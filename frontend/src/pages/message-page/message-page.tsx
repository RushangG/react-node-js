// import { useState, useEffect } from "react";
// import { socket } from "../../Apis/message-api";

export default function MessagePage() {
  // useEffect(() => {
  //   socket.on("room", (message) => {
  //     console.log("Received message:", message);
  //   });
  // }, []);

  return (
    <div className="flex flex-col items-center  justify-center h-screen">
      <h1 className="text-4xl font-bold absolute top-40 left-10">
        Message Page
      </h1>

      <div className="absolute top-40 right-10"></div>

      <div>
        <form>
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
