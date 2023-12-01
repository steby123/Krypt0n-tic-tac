import React, { useState } from "react";

const Gameboard = ({ onSelectSquare,  board }) => {
  //const [gameBoard, setGameBoard] = useState(initialGameBoard);

    //const handleSelectSquare = (rowIndex, colIndex) => {
        //setGameBoard((prevGameBoard) => {
            //const updatedBoard = [...prevGameBoard.map(update => [...update])];
            //updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            //return updatedBoard;
        //});

        //onSelectSquare();
    //}   

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button 
                    onClick={() => onSelectSquare(rowIndex, colIndex)} 
                    disabled={col !== null} 
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default Gameboard;
