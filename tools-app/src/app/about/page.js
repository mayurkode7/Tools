import Link from "next/link";

export const metadata = {
    title: 'About — Tools App',
    description: 'About page for Tools App: learn about the project, goals, and contributors.',
};

export default function AboutPage() {
    return (
        <>
        <main
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '16px',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                background: 'transparent',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 720,
                    boxSizing: 'border-box',
                    padding: '18px',
                    borderRadius: 12,
                    background: '#ffffff',
                    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
                }}
            >
                <h1 style={{ margin: 0, fontSize: 'clamp(1.25rem, 5vw, 2rem)' }}>About Tools</h1>
                <p
                    style={{
                        marginTop: '0.75rem',
                        lineHeight: 1.6,
                        fontSize: 'clamp(0.95rem, 3.5vw, 1rem)',
                        color: '#111827',
                    }}
                >
                    This is the About page for Tools App. Here you will find information about the project,
                    its goals, and the people who contributed. The app aims to provide useful utilities
                    and a pleasant developer experience.
                </p>
            </div>
        </main>
         <footer style={ {  textAlign: 'center' }}>          
            <Link href={"/"} style={ { color: '#0070f3', textDecoration: 'none' }}>Home</Link> | <Link href={"/about"} style={{ color: '#0070f3', textDecoration: 'none' }}>About</Link>
        </footer>

        </>
    );
}