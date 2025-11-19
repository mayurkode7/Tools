'use client'
import Link from "next/link";
import React, { useState } from 'react'
import { styles } from './style'
import RecentOperation from '../UI/components/RecentOperations'

export default function Page() {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [history, setHistory] = useState([]);
    

    const calculate = () => {
        setError('')
        setResult(null)

        const a = parseFloat(from)
        const b = parseFloat(to)

        if (Number.isNaN(a) || Number.isNaN(b)) {
            setError('Please enter valid numbers for both fields.')
            return
        }

        if (a === 0) {
            setError('Cannot calculate percent change when "From" is 0.')
            return
        }

        const percent = ((b - a) / a) * 100
        setResult(`${percent.toFixed(2)}%`)
        setHistory([{ from: a, to: b, result: `${percent.toFixed(2)}%` }, ...history.slice(0, 4)]);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') calculate()
    }

    return (
        <div>
        <main style={styles.container}>
            <h1 style={styles.title}>Percent Calculator</h1>

            <div style={styles.row}>
                <label style={styles.label}>
                    From
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="any"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        onKeyDown={onKeyDown}
                        style={styles.input}
                        placeholder="e.g. 50"
                    />
                </label>

                <label style={styles.label}>
                    To
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="any"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
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
                    onClick={() => {
                        setFrom('')
                        setTo('')
                        setResult(null)
                        setError('')
                    }}
                    style={styles.clear}
                >
                    Clear
                </button>
            </div>

            {error ? <p style={styles.error}>{error}</p> : null}
            
            {result !== null ? (
                <p style={styles.result}>{`Percent change from ${from} to ${to}: `}<strong>{result}</strong></p>
            ) : null}


            <RecentOperation history={history} />

         
           
        </main>
         <footer style={styles.footer || { marginTop: 24, textAlign: 'center' }}>          
            <Link href={"/"} style={styles.link || { color: '#0070f3', textDecoration: 'none' }}>Home</Link>
        </footer>
        </div>
        
    )
}

