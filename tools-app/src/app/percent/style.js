export const styles = {
    container: {
        padding: 24,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        maxWidth: 640,
        margin: '0 auto'
    },
    title: { marginBottom: 16 },
    row: { display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' },
    label: { display: 'flex', flexDirection: 'column', flex: '1 1 200px' },
    input: {
        padding: '8px 10px',
        fontSize: 16,
        marginTop: 6,
        borderRadius: 6,
        border: '1px solid #ccc'
    },
    actions: { marginTop: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 10 },
    button: {
        padding: '8px 14px',
        fontSize: 16,
        borderRadius: 6,
        border: 'none',
        background: '#0366d6',
        color: '#fff',
        cursor: 'pointer',
    },
    clear: {
        padding: '8px 14px',
        fontSize: 16,
        borderRadius: 6,
        border: 'none',
        // background: '#0366d6',
        // color: '#fff',
        cursor: 'pointer',
    },
    error: { color: 'crimson', marginTop: 12 },
    result: { marginTop: 12, fontSize: 18 }
}