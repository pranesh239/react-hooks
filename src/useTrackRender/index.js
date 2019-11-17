import { useRef } from 'react';

const useTrackRender = () => {
  const ref = useRef(0);
  console.log('rendered: ', ref.current++);
};

export default useTrackRender;
