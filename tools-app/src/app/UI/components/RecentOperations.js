export const metadata = {
    title: 'About — Tools App',
    description: 'About page for Tools App: learn about the project, goals, and contributors.',
};

export default function RecentOperation({ history }) {

    const handleShare = async (result) => {
        if (result !== '') {
            await navigator.clipboard.writeText(result.toString());
            alert('Result copied to clipboard!');
        }
    };
    return (
        <>
        {history.length > 0 && (
            <div style={{ marginTop: 32 }}>
                <h5 >Calculation History</h5>
                <ul style={{ marginTop: 20 }}>
                    {history.map((item, index) => (
                        <li key={index} style={{ marginBottom: 15 }}>
                            From {item.from} to {item.to} Percent Change is =  <strong>{item.result}</strong>
                            <button
                                onClick={() => {
                                    const finalResult = `From ${item.from} to ${item.to} Percent Change is ${item.result}.\n\nCalculated using Tools App. \n\nUse Tools App at: https://tools-alpha-beige.vercel.app/percent`;
                                    handleShare(finalResult.toString())
                                }}
                                style={{
                                    marginLeft: 10,
                                    padding: '2px 6px',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                }}
                            >
                                Share
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
           )}</>    
    );
}