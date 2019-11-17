import React, { useState, useMemo, useCallback } from 'react';
import useTrackRender from '../useTrackRender';

const Fibonacci = () => {
  const [num, setNum] = useState(0);
  const [titleColor, setTitleColor] = useState('green');

  //   A cutom hook to track number of re-rendering occured.
  useTrackRender();

  /*  ================================================================================
    TL,DR: 
    ______
    useCallback prevents a function to be created many times, untill their dependency
    changes.


    useCallback prevents the function to be re-created everytime when the state changes,    
    if empty array is given in the dependency array, it create the function firsttime 
    and it returns the same function everyime when it is invoked.
    ================================================================================  */

  const fibonacci = useCallback(n => {
    if (n < 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }, []);

  /*  ================================================================================
    TL,DR: 
    ______
    useMemo memoizes the return value and returns that value if the function is called
    with those same arguments next time.

  
    useMemo memoizes the return value of the function for given arguments and if the
    function is called with the same arguments next time, it returns the memoized 
    value instead running the whole funciton again. 

    In this example, you can see the log ('inside useMemo') is getting printed everytime 
    when you change the state, but if you change any state other then "num", then you can 
    notice that 'inside useMemo' is not printed, as "num" value is not changed and  
    also fibonacci() is called with useCallback, useMemo's dependency array remains unchanged. 
    Hence it serves fibonacciComputedValue from cache, preventing the function to compute
    again.
    ================================================================================  */

  const fibonacciComputedValue = useMemo(() => {
    console.log('inside useMemo');
    return fibonacci(num);
  }, [num, fibonacci]);

  // This function triggers state change

  const handleClick = () => {
    setTitleColor('red');
  };

  return (
    <>
      <h1 style={{ color: titleColor }}>{fibonacciComputedValue}</h1>
      <button onClick={() => setNum(num + 1)}>
        Add count (current count: {num})
      </button>
      <button onClick={handleClick}>Update color</button>
    </>
  );
};

export default Fibonacci;
