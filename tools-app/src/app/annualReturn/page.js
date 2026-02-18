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

        if (a <= 0) {
            setError('Cannot calculate annual return when "Return in percent" is 0 or negative.')
            return
        }

        if (b <= 0) {
            setError('Cannot calculate annual return when "Holding Period (in days)" is 0 or negative.')
            return
        }

        const percent = ((a / b) * 365)
        setResult(`${percent.toFixed(2)}%`)
        setHistory([`Annual Return: ${percent.toFixed(2)}%`, ...history.slice(0, 4)]);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') calculate()
    }

    const clear = () => {
    setFrom('');
    setTo('');
    setResult(null);
    setError('');
                    
    }    

    return (
        <div>
        <main style={styles.container}>
            <h1 style={styles.title}>Annual Return</h1>

            <div style={styles.row}>
                <label style={styles.label}>
                    Return in percent
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="any"
                        value={from}
                        onChange={(e) => {setFrom(e.target.value), setResult(null)}}
                        onKeyDown={onKeyDown}
                        style={styles.input}
                        placeholder="e.g. 1.5%"
                    />
                </label>

                <label style={styles.label}>
                    Holding Period (in days)
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        step="any"
                        value={to}
                        onChange={(e) => {setTo(e.target.value); setResult(null)}}
                        onKeyDown={onKeyDown}
                        style={styles.input}
                        placeholder="e.g. 15"
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
                <p style={styles.result}>{`Annual Return: `}<strong>{result}</strong></p>
            ) : null}


            <RecentOperation history={history} />

         
           
        </main>
         <footer style={styles.footer || { marginTop: 10, textAlign: 'center' }}>          
            <Link href={"/"} style={styles.link || { color: '#0070f3', textDecoration: 'none' }}>Home</Link> | <Link href={"/about"} style={styles.link || { color: '#0070f3', textDecoration: 'none' }}>About</Link>
        </footer>
        </div>
        
    )
}

