import { useState } from 'react';

export default function Counter() {

    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(prev => prev + 1);
    }

    function handleDecrement() {
        if (count > 0) {
            setCount(prev => prev - 1);
        }
    }

    function handleReset() {
        setCount(0);
    }

    return (
        <>
            <h1>Counter </h1>
            <h2>Current Count : {count} </h2>
            <button onClick={handleIncrement}>
                pressed to Increment(+1) Count
            </button>
            <button onClick={handleDecrement}>
                pressed to Decrement(-1) Count
            </button>
            <button onClick={handleReset}>
                pressed to Reset(back to 0) Count
            </button>
        </>
    );
}