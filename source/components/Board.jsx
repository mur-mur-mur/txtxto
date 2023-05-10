import { useGameContext } from '../context/GameContext';
import Square from './Square';

export default function Board() {
  const {
    board,
    message,
    active,
    resetGame,
    resetBoard,
    oCount,
    xCount
  } = useGameContext();

  function handleBoardReset() {
    resetBoard();
  }

  function handleGameReset() {
    resetGame();
  }



  return (
    <>
      <p>{ `Score: x has won ${ xCount } games! o has won ${ oCount } games!`}</p>
      <p>{ message }</p>
      <div className="board">
        {
          board.map((space) => <Square key={ space.idx } { ...{ space } } />)
        }
      </div>
      { !active && <button onClick={ handleBoardReset }>reset</button> }
      { !active && <button onClick={ handleGameReset }>restart games</button> }
    </>
  );
}
