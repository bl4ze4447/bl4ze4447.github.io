function Letter(props) {
    return (
        <div className={`letter-box ${letter_classname(props.state)} ${props.reveal && 'letter-flip'}`} 
        style={{transitionDelay: `${0.3 * props.pos}s`}}>
            <p className="letter">{props.char}</p>
        </div>
    )
}

function letter_classname(state) {
    if (state === 0) {
        return "empty-letter";
    } 
    if (state === 1) {
        return "half-letter";
    }

    return "guessed-letter";
}

export default Letter;