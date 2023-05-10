import { useEffect } from 'react';

export default function useBoard() {
  const initialState = new Array(9)
    .fill('')
    .map((val, idx) => {
      const square = {
        ind: idx,
        ltr: val
      };
      return square;
    });
  
  useEffect(() => {
    function loadBoard(initialState) {
      return initialState;
    }
    loadBoard(initialState);
  }, [initialState]);
  return initialState;
}
