"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";
import { ListGroup } from "react-bootstrap";

export default function Home() {
  const [query, setQuery] = useState("");

  const tools = useMemo(
    () => [
      { name: "Translator", href: "/translator" },
      { name: "Calculator", href: "/calculator" },
      { name: "Percent", href: "/percent" },
      // Add more tools here as you build them
    ],
    []
  );

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((t) => t.name.toLowerCase().includes(q));
  }, [query, tools]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Tools</h1>

        <input
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tools"
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid var(--gray-alpha-200)",
            background: "var(--background)",
            color: "var(--foreground)",
            outline: "none",
            width: 280,
          }}
        />

        <ListGroup style={{ width: 320 }}>
          {filteredTools.map((tool) => (
            <ListGroup.Item key={tool.href} as={Link} href={tool.href} action>
              {tool.name}
            </ListGroup.Item>
          ))}
          {filteredTools.length === 0 && (
            <ListGroup.Item disabled>No results</ListGroup.Item>
          )}
        </ListGroup>
      </main>
      <footer className={styles.footer}>
        <p>Developed by Mayur Vijay Kode.</p>
      </footer>
    </div>
  );
}
