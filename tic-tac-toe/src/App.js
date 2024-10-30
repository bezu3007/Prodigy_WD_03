import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // You can create custom styles here

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const foundWinner = calculateWinner(newBoard);
    if (foundWinner) {
      setWinner(foundWinner);
    }
  };

  const calculateWinner = (board) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes(null)) {
      return 'Draw';
    }
    return null;
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => (
    <button className="square btn btn-light" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center">Tic Tac Toe</h1>
      <div className="game-board d-grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {board.map((_, index) => renderSquare(index))}
      </div>
      <div className="text-center mt-4">
        {winner ? (
          <h2>{winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} Wins!`}</h2>
        ) : (
          <h2>Next Player: {isXNext ? 'X' : 'O'}</h2>
        )}
        <button className="btn btn-primary mt-3" onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
};

export default TicTacToe;
