import Letter from './Letter';

function getCorrespondingState(word, secret, setGameState, row) {
    word = word.toUpperCase();
    secret = [...secret.toUpperCase()];

    let states = Array(5).fill(0);
    word.split('').forEach((ch, idx) => {
        if (ch === secret[idx]) {
            states[idx] = 2;
            secret[idx] = '!';
        }
    });

    word.split('').forEach((ch, idx) => {
        if (secret.includes(ch) && states[idx] === 0) {
            states[idx] = 1;
            secret[idx] = '!';
        }
    });


    if (states.filter(state => state === 2).length === 5) {
        setGameState(1);
    }

    return states;
}

function GameRow(props) {
    let word = props.word;
    let secret = props.secretWord;
    const states = props.reveal ? getCorrespondingState(word, secret, props.setGameState, props.rowIdx) : Array(5).fill(0);

    return (
        <div className='game-row'>
            {word.toUpperCase().split('').map((char, index) => (
                <Letter key={index} char={char} state={states[index]} pos={index} reveal={props.reveal} />
            ))}
            {(5-props.word.length) > 0 && Array(5-props.word.length).fill(0).map((_, idx) => (
                    <Letter key={idx} char={''} state={0} />
            ))}
        </div>
    );
}

export default GameRow;