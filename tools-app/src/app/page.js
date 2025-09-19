import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h1>Tools</h1>
      </main>
      <footer className={styles.footer}>
      <p>Copyright 2025. Developed by Mayur Vijay Kode.</p>
      </footer>
    </div>
  );
}
