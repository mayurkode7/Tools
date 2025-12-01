'use client'
import Link from "next/link";
import React, { useState } from 'react'
import { styles } from './style'
import RecentOperation from '../UI/components/RecentOperations'

export default function Page() {
    const [is, setIs] = useState('')
    const [of, setOf] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [history, setHistory] = useState([]);
    

    const calculate = () => {
        setError('')
        setResult(null)

        const a = parseFloat(is)
        const b = parseFloat(of)

        if (Number.isNaN(a) || Number.isNaN(b)) {
            setError('Please enter valid numbers for both fields.')
            return
        }

        if (a === 0) {
            setError('Cannot calculate percent change when "From" is 0.')
            return
        }

        // const percent = ((b - a) / a) * 100
        const percent = (b / 100) * a;
        setResult(`${percent.toFixed(2)}`)
        // setHistory([{ from: is, to: of, result: `${percent.toFixed(2)}%` }, ...history.slice(0, 4)]);
        setHistory([`${is}% of ${of} is: ${percent.toFixed(2)}`, ...history.slice(0, 4)]);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') calculate()
    }

    const clear = () => {
    setIs('');
    setOf('');
    setResult(null);
    setError('');
                    
    }    

    return (
        <div>
        <main style={styles.container}>
            <h1 style={styles.title}>Percent Of</h1>

            <div style={styles.row}>
                <label style={styles.label}>
                    What is
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="any"
                        value={is}
                        onChange={(e) => {setIs(e.target.value), setResult(null)}}
                        onKeyDown={onKeyDown}
                        style={styles.input}
                        placeholder="e.g. 50"
                    />
                </label>

                <label style={styles.label}>
                    % of
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="any"
                        value={of}
                        onChange={(e) => {setOf(e.target.value); setResult(null)}}
                        onKeyDown={onKeyDown}
                        style={styles.input}
                        placeholder="e.g. 75"
                    />
                </label>
            </div>

            <div style={styles.actions}>
                <button onClick={calculate} style={styles.button}>
                    Calculate
                </button>
                <button
                    type="button"
                    onClick={clear}
                    style={styles.clear}
                >
                    Clear
                </button>
            </div>

            {error ? <p style={styles.error}>{error}</p> : null}
            
            {result !== null ? (
                // <p style={styles.result}>{`Percent change from ${is} to ${of}: `}<strong>{result}</strong></p>
                <p style={styles.result}>{`${is}% of ${of} is: `}<strong>{result}</strong></p>
            ) : null}


            <RecentOperation history={history} />

         
           
        </main>
         <footer style={styles.footer || { marginTop: 10, textAlign: 'center' }}>          
            <Link href={"/"} style={styles.link || { color: '#0070f3', textDecoration: 'none' }}>Home</Link> | <Link href={"/about"} style={styles.link || { color: '#0070f3', textDecoration: 'none' }}>About</Link>
        </footer>
        </div>
        
    )
}

