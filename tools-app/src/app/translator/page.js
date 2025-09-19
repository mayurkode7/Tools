"use client";

import styles from "../page.module.css";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function Translator() {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const languageOptions = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ar", name: "Arabic" },
    { code: "zh", name: "Chinese (Simplified)" },
    { code: "ja", name: "Japanese" },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Translator</h1>

        <Form style={{ width: 320 }}>
          <Form.Group className="mb-3" controlId="sourceLanguage">
            <Form.Label>Source language</Form.Label>
            <Form.Select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              {languageOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="targetLanguage">
            <Form.Label>Target language</Form.Label>
            <Form.Select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languageOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        <Form style={{ width: 320 }}>
          <Form.Group className="mb-3" controlId="textToTranslate">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter paragraph to translate"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
        </Form>

        <Form style={{ width: 320 }}>
          <Form.Group className="mb-3" controlId="translatedText">
            <Form.Label>Translated text</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Translation will appear here"
              value={translatedText}
              readOnly
            />
          </Form.Group>
        </Form>
      </main>
      <footer className={styles.footer}>
        <p>copyright 2025. Developed by Mayur Vijay Kode.</p>
      </footer>
    </div>
  );
}


    