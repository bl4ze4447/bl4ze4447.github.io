import { useCallback, useEffect, useState } from 'react';
import GameRow from './GameRow'
import { WORDLIST } from '../wordlist/cuvinte';


// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function getDailyWord() {
    const today = new Date().L;
    const epoch = new Date().valueOf();
    const rand = cyrb53((today-epoch) / 86400000);
    return WORDLIST[rand % WORDLIST.length];
}

function GameGrid(props) {
    const keys = props.keys;
    const simulateKey = props.simulateKey;

    const secretWord = getDailyWord();

    const [rowIdx, setRowIdx] = useState(0);
    const [words, updateWords] = useState(Array(6).fill(''));
    const [revealStates, setRevealStates] = useState(Array(6).fill(false));
    const [gameState, setGameState] = useState(0);

    const handleKeyDown = useCallback((key) => {
        const updateWordAtRow = (word) => {
            const updatedWords = [...words];
            updatedWords[rowIdx] = word;
            updateWords(updatedWords);
        }

        if (rowIdx === 6 || gameState === 1) return;

        if (key === 'Enter') {
            if (words[rowIdx].length !== 5 || !WORDLIST.includes(words[rowIdx])) {
                return;
            }

            setRevealStates((prevStates) => {
                const newStates = [...prevStates];
                newStates[rowIdx] = true;
                return newStates;
            });

            setRowIdx(Math.min(rowIdx + 1, 6));
        } else if (key === 'Backspace') {        
            updateWordAtRow(words[rowIdx].slice(0, -1));
        } else if ((key.match(/[a-z]/i) && key.length === 1) && words[rowIdx].length < 5) {
            updateWordAtRow(words[rowIdx] + key);
        }
      }, [rowIdx, words, gameState]);

    useEffect(() => {
        const onKeyDown = (e) => { handleKeyDown(e.key); }
        window.addEventListener('keydown', onKeyDown);
        return () => {
          window.removeEventListener('keydown', onKeyDown);
        };
      }, [handleKeyDown]);

      useEffect(() => {
        if (keys.length > 0) {
            handleKeyDown(keys[0]);
            simulateKey((val) => {
                let newKeys = [...val.slice(1)];
                return newKeys;
            });
        }
      }, [keys, simulateKey, handleKeyDown]);


    return (
        <div>
            {words.map((word, index) => (
                <GameRow key={index} word={word} secretWord={secretWord} reveal={revealStates[index]} setGameState={setGameState} />
            ))}

            {/* { gameState === 1 && (
                <p className='game-state'>Ai castigat, felicitari!</p>
            )}
            { rowIdx === 6 && gameState === 0 && (
                <p>Ai pierdut, cuvantul a fost {secretWord}!</p>
            )} */}
        </div>
    )
}

export default GameGrid;