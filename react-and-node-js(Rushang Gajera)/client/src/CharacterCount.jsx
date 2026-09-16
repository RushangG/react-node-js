import { useEffect, useState } from "react";

export default function CharacterCount() {

    const [text, setText] = useState('');
    const [count, setCount] = useState();

    function handleChange(e) {
        setText(e.target.value);
    }

    useEffect(() => {
        let size = text.length;
        setCount(size);
    }, [text])

    return (
        <>
            <h1> Character Count </h1>
            <input value={text} onChange={handleChange} placeholder="Enter text" />
            {count > 100 ?
                <p style={{ color: "red" }}>  Live character Count : {count} </p> :
                <p >  Live character Count : {count} </p>}
        </>
    );
}