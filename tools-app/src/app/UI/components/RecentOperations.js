export const metadata = {
  title: "About — Tools App",
  description:
    "About page for Tools App: learn about the project, goals, and contributors.",
};

export default function RecentOperation({ history }) {
  const handleShare = async (result) => {
   
      await navigator.clipboard.writeText(result.toString());
      alert("Result copied to clipboard!");
    
  };
  return (
    <>
      {history.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h5>Calculation History</h5>
          <ul style={{ marginTop: 20 }}>
            {history.map((item, index) => (
              <li key={index} style={{ marginBottom: 15 }}>
               {item}
                <button
                  onClick={() => {
                    const finalResult = `${item}.\n\nCalculated using Tools App. \n\nUse Tools App at: https://tools-alpha-beige.vercel.app`;
                    handleShare(finalResult.toString());
                  }}
                  style={{
                    fontSize: 14,
                    borderRadius: 6,
                    border: "none",
                    backgroundColor: "lightgreen",
                    cursor: "pointer",
                    height: 28,
                    padding: "0 12px",
                    marginLeft: 10,
                  }}
                >
                  Share
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
