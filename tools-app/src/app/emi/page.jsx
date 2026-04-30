'use client'
import Link from "next/link";
import React, { useState } from 'react';
import RecentOperation from '../UI/components/RecentOperations';

// Defining styles inline to ensure it works without a separate style.js file
const styles = {
    container: { maxWidth: 400, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' },
    title: { textAlign: 'center', marginBottom: 20 },
    row: { display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 20 },
    label: { display: 'flex', flexDirection: 'column', gap: 5, fontWeight: 'bold' },
    input: { padding: 10, fontSize: 16, borderRadius: 4, border: '1px solid var(--gray-alpha-200, #ccc)' },
    actions: { display: 'flex', gap: 10, marginBottom: 20 },
    button: { flex: 1, padding: 10, fontSize: 16, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
    clear: { flex: 1, padding: 10, fontSize: 16, background: '#eaeaea', color: '#333', border: 'none', borderRadius: 4, cursor: 'pointer' },
    error: { color: 'red', marginBottom: 10 },
    result: { fontSize: 16, marginBottom: 20, padding: 15, background: 'var(--gray-alpha-200, #f9f9f9)', borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 8 },
    footer: { marginTop: 10, textAlign: 'center' },
    link: { color: '#0070f3', textDecoration: 'none' }
};

export default function EmiPage() {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);

    const calculate = () => {
        setError('');
        setResult(null);

        const p = parseFloat(principal.replace(/,/g, '')); // Remove commas for calculation
        const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
        const n = parseFloat(tenure); // Tenure in months

        if (Number.isNaN(p) || Number.isNaN(parseFloat(rate)) || Number.isNaN(n)) {
            setError('Please enter valid numbers for all fields.');
            return;
        }

        if (p <= 0 || n <= 0) {
            setError('Principal and Tenure must be greater than 0.');
            return;
        }

        let emi = 0;
        if (r === 0) {
            emi = p / n; // If 0% interest, it's just principal divided by months
        } else {
            // Standard EMI Formula: P x R x (1+R)^N / [(1+R)^N-1]
            emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }

        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;

        const formatCurrency = (val) => val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        const formattedEmi = formatCurrency(emi);

        setResult({
            emi: formattedEmi,
            totalInterest: formatCurrency(totalInterest),
            totalPayment: formatCurrency(totalPayment)
        });

        setHistory([`EMI for ${principal} at ${rate}% for ${n} months is: ${formattedEmi}`, ...history.slice(0, 4)]);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') calculate();
    };

    const clear = () => {
        setPrincipal('');
        setRate('');
        setTenure('');
        setResult(null);
        setError('');
    };

    const handlePrincipalChange = (e) => {
        // Remove existing commas to get the raw number
        const rawValue = e.target.value.replace(/,/g, '');
        
        // Allow only digits and a single decimal point
        if (!/^\d*\.?\d*$/.test(rawValue)) return;
        
        const parts = rawValue.split('.');
        let formatted = parts[0] ? Number(parts[0]).toLocaleString('en-IN') : '';
        if (parts.length > 1) formatted += '.' + parts[1]; // Preserve decimals
        
        setPrincipal(formatted);
        setResult(null);
    };

    return (
        <>
            <main style={styles.container}>
                <h1 style={styles.title}>EMI Calculator</h1>

                <div style={styles.row}>
                    <label style={styles.label}>
                        Principal Amount
                        <input
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            step="any"
                            value={principal}
                            onChange={handlePrincipalChange}
                            onKeyDown={onKeyDown}
                            style={styles.input}
                            placeholder="e.g. 500000"
                        />
                    </label>

                    <label style={styles.label}>
                        Annual Interest Rate (%)
                        <input
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            step="any"
                            value={rate}
                            onChange={(e) => { setRate(e.target.value); setResult(null); }}
                            onKeyDown={onKeyDown}
                            style={styles.input}
                            placeholder="e.g. 8.5"
                        />
                    </label>

                    <label style={styles.label}>
                        Tenure (in months)
                        <input
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*"
                            step="any"
                            value={tenure}
                            onChange={(e) => { setTenure(e.target.value); setResult(null); }}
                            onKeyDown={onKeyDown}
                            style={styles.input}
                            placeholder="e.g. 60"
                        />
                    </label>
                </div>

                <div style={styles.actions}>
                    <button onClick={calculate} style={styles.button}>
                        Calculate
                    </button>
                    <button type="button" onClick={clear} style={styles.clear}>
                        Clear
                    </button>
                </div>

                {error ? <p style={styles.error}>{error}</p> : null}

                {result !== null ? (
                    <div style={styles.result}>
                        <span>Principal Amount: <strong>{principal}</strong></span>
                        <span>Interest Rate: <strong>{rate}%</strong></span>
                        <span>Tenure: <strong>{tenure} months</strong></span>
                        <span>Monthly EMI: <strong>{result.emi}</strong></span>
                        <span>Total Interest: <strong>{result.totalInterest}</strong></span>
                        <span>Total Payment: <strong>{result.totalPayment}</strong></span>
                    </div>
                ) : null}

                {/* <RecentOperation history={history} /> */}
            </main>
            <footer style={styles.footer}>
                <Link href={"/"} style={styles.link}>Home</Link> | <Link href={"/about"} style={styles.link}>About</Link>
            </footer>
        </>
    );
}