import { useGameContext } from '../context/GameContext';

export default function Square({ index, value }) {
  const { handleClick } = useGameContext();
  return (
    <>
      <article onClick={ () => handleClick(index) } id={ index } className="square">
        { value }
      </article>
    </>
  );
}
