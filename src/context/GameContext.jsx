import { useState, createContext, useContext } from 'react';
import { useBoard } from '../hooks/useBoard';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  
  const { initialState } = useBoard();
  console.log(initialState);
  const [board, setBoard] = useState(initialState);
  console.log(board);
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
  
  function checkWinner() {
    if (
      board[0].ltr !== '' &&
        board[0].ltr ===
        board[1].ltr &&
        board[1].ltr ===
        board[2].ltr
    ) {
      return board[2].ltr;
    } else if (
      board[3].ltr !== '' &&
        board[3].ltr ===
        board[4].ltr &&
        board[4].ltr ===
        board[5].ltr
    ) {
      return board[5].ltr;
    } else if (
      board[6].ltr !== '' &&
        board[6].ltr ===
        board[7].ltr &&
        board[7].ltr ===
        board[8].ltr
    ) {
      return board[8].ltr;
    } else if (
      board[0].ltr !== '' &&
        board[0].ltr ===
        board[3].ltr &&
        board[3].ltr ===
        board[6].ltr
    ) {
      return board[6].ltr;
    } else if (
      board[1].ltr !== '' &&
        board[1].ltr ===
        board[4].ltr &&
        board[4].ltr ===
        board[7].ltr
    ) {
      return board[7].ltr;
    } else if (
      board[2].ltr !== '' &&
        board[2].ltr ===
        board[5].ltr &&
        board[5].ltr ===
        board[8].ltr
    ) {
      return board[8].ltr;
    } else if (
      board[0].ltr !== '' &&
        board[0].ltr ===
        board[4].ltr &&
        board[4].ltr ===
        board[8].ltr
    ) {
      return board[8].ltr;
    } else if (
      board[2].ltr !== '' &&
        board[2].ltr ===
        board[4].ltr &&
        board[4].ltr ===
        board[6].ltr
    ) {
      return board[6].ltr;
    } else {
      return false;
    }
  }

  function catsGame() {
    return board.filter(square => square.ltr === '').length === 0;
  }

  function checkGame() {
    if (!active) return;
    const winner = checkWinner();
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
