import { useGameContext } from '../context/GameContext';
import './square.css';

export default function Square(square) {
  
  const {
    active,
    board,
    setBoard,
    turn
  } = useGameContext();

  const handleSquareClick = (square) => {
    if (square.ltr) return;
    if (!active) return;
    square.ltr = turn;
    const newBoardState = [...board];
    setBoard(newBoardState);
  };

  return (
    <>
      <div
        onClick={ handleSquareClick }
        className="square"
      >
        { square.ltr }
      </div>
    </>
  );
}
