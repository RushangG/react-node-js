

export default function ({ name, course, batch = 2026 }) {

    return (
        <>
            <div>
                <p> Name : {name}</p>
                <p> course : {course}</p>
                <p> batch : {batch} </p>
            </div>
        </>
    )
}