export const metadata = {
    title: 'About — Tools App',
    description: 'About page for Tools App: learn about the project, goals, and contributors.',
};

export default function RecentOperation({ history }) {
    return (
        <>
        {history.length > 0 && (
            <div style={{ marginTop: 32 }}>
                <h2 >Calculation History</h2>
                <ul >
                    {history.map((item, index) => (
                        <li key={index} style={{ marginBottom: 15 }}>
                            From {item.from} to {item.to}: <strong>{item.result}</strong>
                        </li>
                    ))}
                </ul>
            </div>
           )}</>    
    );
}