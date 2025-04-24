import { AiOutlineEnter } from "react-icons/ai";
import { IoBackspaceOutline } from "react-icons/io5";

function Keyboard(props) {
    const rowOneKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const rowTwoKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const rowThreeKeys = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];
    const simulateKey = props.simulateKey;

    return (
        <div className="keyboard-grid">
            <div className="key-row">
                {rowOneKeys.map((key, i) => (
                    <div key={i} className="key-box" onClick={() => simulateKey((keys) => {
                        return [...keys, key];
                    })}>
                        <p>{key}</p>
                    </div>
                ))}
            </div>
            <div className="key-row">
                {rowTwoKeys.map((key, i) => (
                    <div key={i} className="key-box" onClick={() => simulateKey((keys) => {
                        return [...keys, key];
                    })}>
                        <p>{key}</p>
                    </div>
                ))}
            </div>
            <div className="key-row">
                {rowThreeKeys.map((key, i) => (
                    <div key={i} className="key-box" onClick={() => simulateKey((keys) => {
                        return [...keys, key];
                    })}>
                        {key === 'Enter' && <AiOutlineEnter className="react-icon longer" />}
                        {key === 'Backspace' && <IoBackspaceOutline className="react-icon longer" />}
                        {key.length === 1 && <p>{key}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Keyboard;