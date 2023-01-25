import { useEffect, useState } from "react";
import "./App.css";
import RenderGrid from "./RenderGrid";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

function App() {
  let [isReady, setIsReady] = useState("");
  let [turn, setTurn] = useState(0);

  const checkReady = (mark) => {
    setIsReady(mark);
    socket.emit("mark_checked", { mark: mark });
  };

  useEffect(() => {
    console.log(socket);

    socket.on("chosen_mark", (data) => {
      const newMark = data.mark === "X" ? "O" : "X";
      setIsReady(newMark);
      setTurn(data.player);
    });

    return () => {
      socket.off("chosen_mark");
    };
  }, [socket]);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {isReady === "" ? (
        <>
          <h2>Escolha um botão</h2>
          <button onClick={() => checkReady("X")}>X</button>
          <button onClick={() => checkReady("O")}>O</button>
        </>
      ) : null}

      {isReady ? (
        <RenderGrid xO={isReady} socket={socket} turn={turn}></RenderGrid>
      ) : null}
    </div>
  );
}

export default App;
