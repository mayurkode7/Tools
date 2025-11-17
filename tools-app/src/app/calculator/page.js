
'use client';
import React, { useState } from 'react';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const handleButtonClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleBackspace = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handleCalculate = () => {
        try {
            // eslint-disable-next-line no-eval
            const evalResult = eval(input);
            setResult(evalResult);
            setHistory([{ input, result: evalResult }, ...history.slice(0, 4)]);
        } catch {
            setResult('Error');
        }
    };

    const handleShare = async () => {
        if (result !== '') {
            await navigator.clipboard.writeText(result.toString());
            alert('Result copied to clipboard!');
        }
    };

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    return (
        <div style={{ maxWidth: 320, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Calculator</h2>
            <div style={{ marginBottom: 10 }}>
                <input
                    type="text"
                    value={input}
                    readOnly
                    style={{ width: '100%', fontSize: 24, marginBottom: 5, padding: 5 }}
                />
                <div style={{ fontSize: 20, minHeight: 28 }}>{result !== '' && `= ${result}`}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {buttons.map((btn) =>
                    btn === '=' ? (
                        <button key={btn} onClick={handleCalculate} style={{ fontSize: 18, padding: 10 }}>=</button>
                    ) : (
                        <button key={btn} onClick={() => handleButtonClick(btn)} style={{ fontSize: 18, padding: 10 }}>{btn}</button>
                    )
                )}
                <button onClick={handleBackspace} style={{ gridColumn: 'span 2', fontSize: 18, padding: 10 }}>←</button>
                <button onClick={handleClear} style={{ gridColumn: 'span 2', fontSize: 18, padding: 10 }}>C</button>
            </div>
            <button
                onClick={handleShare}
                style={{ marginTop: 15, width: '100%', fontSize: 18, padding: 10, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4 }}
                disabled={result === ''}
            >
                Share Result
            </button>
            <div style={{ marginTop: 20 }}>
                <h4>Recent Operations</h4>
                <ul>
                    {history.map((item, idx) => (
                        <li key={idx} style={{ fontSize: 16 }}>
                            {item.input} = {item.result}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}