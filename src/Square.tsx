import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function Square({
  xO,
  socket,
  isTurn,
  setIsTurn,
  idx,
  squarePosition,
}: {
  xO: string;
  socket: any;
}) {
  let [image, setImage] = useState("empty");

  useEffect(() => {
    const nextImage = xO === "X" ? "O" : "X";
    if (squarePosition !== null && squarePosition === idx) {
      setImage(nextImage);
    }
  }, [squarePosition]);

  //   if (squarePosition === idx) {
  //     setImage(xO);
  //   }

  const onClickRender = () => {
    if (isTurn === 0 && image === "empty") {
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
