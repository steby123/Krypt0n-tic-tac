import React, { useState } from "react";
import Player from "./component/Player";
import Gameboard from "./component/Gameboard";
import Log from "./component/Log";
import GameOver from "./component/GameOver";
import WINNING_COMBINATIONS from "./component/winning-combination";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let current = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    current = 'O';
  }

  return current;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

const deriveWinner = (gameBoard, player) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

const App = () => {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  // Correct the variable name from GameBoard to gameBoard
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDrawn = gameTurns.length === 9 && !winner;

  const playerHandleName = (symbol, newName) => {
    setPlayers((prevPlayer) => ({
      ...prevPlayer,
      [symbol]: newName
    }));
  }

  const handleSelect = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const current = deriveActivePlayer(prevTurns);

      const updateTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: current,
        },
        ...prevTurns,
      ];

      return updateTurns;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={players.X} symbol="X" isActive={activePlayer === "X"} onChangeName={(newName) => playerHandleName("X", newName)} />
          <Player name={players.O} symbol="O" isActive={activePlayer === "O"} onChangeName={(newName) => playerHandleName("O", newName)} />
        </ol>
        {(winner || hasDrawn) && <GameOver winner={winner} onRestart={handleRematch} />}
        {/* Correct the variable name from GameBoard to gameBoard */}
        <Gameboard onSelectSquare={handleSelect} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
