import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Square from "./Square";

function RenderGrid({
  xO,
  socket,
  turn,
}: {
  xO: string;
  socket: any;
  turn: number;
}) {
  let [isTurn, setIsTurn] = useState(turn);
  let [squarePosition, setSquarePosition] = useState(null);
  const teste = () => {
    socket.emit("next_turn_chosen", { turn: 0 });
  };

  useEffect(() => {
    socket.on("next_turn", (data) => {
      setSquarePosition(data.squarePosition);
      setIsTurn(data.turn);
    });
  }, [socket]);

  const gameSquares = [...Array(9).keys()];

  return (
    <div className="grid__container">
      <div className="grid__game">
        {gameSquares.map((el, idx) => {
          return (
            <Square
              xO={xO}
              socket={socket}
              isTurn={isTurn}
              setIsTurn={setIsTurn}
              idx={idx}
              squarePosition={squarePosition}
            ></Square>
          );
        })}
      </div>
    </div>
  );
}

export default RenderGrid;
