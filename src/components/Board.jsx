import { useGameContext } from '../context/GameContext';
import Square from './Square';

export default function Board() {
  const { message, board, gameReset, active } = useGameContext();

  const handleReset = () => {
    gameReset();
  };

  return (
    <>
      <p>{ message }</p>
      <div className="board">
        { board.map(({ val, idx }) => (
          <Square key={ idx } index={ idx } value={ val } />
        )) }
      </div>
      { !active && <button onClick={ handleReset }>reset</button> }
    </>
  );
}
