import { useState, createContext, useContext } from 'react';
import { useBoard } from '../hooks/useBoard';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  
  const { initialState } = useBoard();
  
  const [board, setBoard] = useState(initialState);
  const [turn, setTurn] = useState('x');
  const [message, setMessage] = useState(`${turn}'s move`);
  const [active, setActive] = useState(true);
  const [oCount, setOCount] = useState(0);
  const [xCount, setXCount] = useState(0);

  function handleClick(square) {
    if (!active) return;
    if (board[square] !== '') return;
    setBoard(
      spaces => spaces.map(
        space => space.idx === square ?
          { idx: square, ltr: setTurn } : square
      )
    );
    setTurn(turn === 'x' ? 'o' : 'x');
    setMessage(turn === 'x' ? 'o' : 'x');
  }
  
  function checkWinner(spaces) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
        return spaces[a].ltr;
      }
    }
    return null;
  }

  function catsGame() {
    return board.filter(square => square.ltr === '').length === 0;
  }

  function checkGame() {
    if (!active) return;
    const winner = checkWinner(spaces);
    if (winner) {
      setActive(false);
      setMessage(`${winner} has won the game!}`);
      if (winner === 'x') {
        setXCount(xCount + 1);
      } else {
        setOCount(oCount + 1);
      }
    }
  }

  checkGame();

  function resetBoard() {
    setTurn('x');
    setMessage(`${turn}'s turn`);
    setBoard(initialState);
    setActive(true);
  }

  function resetGame() {
    resetBoard();
    setXCount(0);
    setOCount(0);
}

    return (
      <GameContext.Provider value={ {
        resetGame,
        resetBoard,
        catsGame,
        checkWinner,
        handleClick,
        board,
        setBoard,
        turn,
        setTurn,
        message,
        setMessage,
        active,
        setActive
      } }>
        { children }
      </GameContext.Provider>
    );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a provider!');
  }
  return context;
}
