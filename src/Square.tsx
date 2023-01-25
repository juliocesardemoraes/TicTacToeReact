import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function Square({
  xO,
  socket,
  isTurn,
  setIsTurn,
  idx,
}: {
  xO: string;
  socket: any;
}) {
  let [image, setImage] = useState("empty");

  const onClickRender = () => {
    if (isTurn === 0) {
      setImage(xO);
      socket.emit("next_turn_chosen", { turn: 0, squarePosition: idx });
      setIsTurn(1);
    }
  };

  return (
    <div className="grid__square" onClick={() => onClickRender()}>
      <img src={`${image}.png`} />
    </div>
  );
}

export default Square;
