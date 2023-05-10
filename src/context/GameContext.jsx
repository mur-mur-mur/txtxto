import { useContext, createContext, useState } from 'react';

const GameContext = createContext();

export function GameContextProvider({ children }) {

  const newBoard = new Array(9).fill().map(
    // eslint-disable-next-line no-unused-vars
    (val, idx) => (
      { idx, val: '' }
    ));
  const [turn, setTurn] = useState('x');
  const [board, setBoard] = useState(newBoard);
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState(`x's turn`);

  function handleClick(i) {
    if (!active) return;
    if (board[i].val !== '') return;

    setBoard(x =>
      x.map(
        space => space.idx === i ?
          { idx: i, val: turn } : space));
    
    setTurn(turn === 'x' ? 'o' : 'x');
    setMessage(turn === 'x' ? 'o goes' : 'x goes');
  }

  function checkWinner() {
    if (
      board[0].val !== '' &&
      board[0].val ===
      board[1].val &&
      board[1].val ===
      board[2].val
    ) {
      return board[2].val;
    } else if (
      board[3].val !== '' &&
      board[3].val ===
      board[4].val &&
      board[4].val ===
      board[5].val
    ) {
      return board[5].val;
    } else if (
      board[6].val !== '' &&
      board[6].val === 
      board[7].val &&
      board[7].val === 
      board[8].val
    ) {
      return board[8].val;
    } else if (
      board[0].val !== '' &&
      board[0].val === 
      board[3].val &&
      board[3].val === 
      board[6].val
    ) {
      return board[6].val;
    } else if (
      board[1].val !== '' &&
      board[1].val === 
      board[4].val &&
      board[4].val === 
      board[7].val
    ) {
      return board[7].val;
    } else if (
      board[2].val !== '' &&
      board[2].val === 
      board[5].val &&
      board[5].val === 
      board[8].val
    ) {
      return board[8].val;
    } else if (
      board[0].val !== '' &&
      board[0].val === 
      board[4].val &&
      board[4].val === 
      board[8].val
    ) {
      return board[8].val;
    } else if (
      board[2].val !== '' &&
      board[2].val === 
      board[4].val &&
      board[4].val === 
      board[6].val
    ) {
      return board[6].val;
    } else {
      return false;
    }
  }

  function cat() {
    return board.filter(square => square.val === '').length === 0;
  }

  function checkGame() {
    if (!active) return;
    const winner = checkWinner();
    if (winner) {
      setMessage(`${winner} wins`);
      setActive(false);
    } else if (cat()) {
      setMessage('cat game');
      setActive(false);
    }
  }
  checkGame();

  function gameReset() {
    setBoard(newBoard);
    setActive(true);
    setMessage(`${turn}'s turn`);
    setTurn('x');
  }

  return (
    <GameContext.Provider value={ {
      board,
      turn,
      active,
      message,
      handleClick,
      gameReset
    } }>
      { children }
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a provider');
  }
  return context;
}
