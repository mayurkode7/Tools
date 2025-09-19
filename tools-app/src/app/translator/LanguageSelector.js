import React from 'react';
import { Form } from 'react-bootstrap';

const LanguageSelector = ({ type, defaultLanguage, onChange }) => {
  const languages = [
    { code: 'eng_Latn', name: 'English' },
    { code: 'spa_Latn', name: 'Spanish' },
    { code: 'fra_Latn', name: 'French' },
    { code: 'deu_Latn', name: 'German' },
    { code: 'hin_Deva', name: 'Hindi' },
    { code: 'mar_Deva', name: 'Marathi' },
    { code: 'por_Latn', name: 'Portuguese' },
    { code: 'rus_Cyrl', name: 'Russian' },
    { code: 'arb_Arab', name: 'Arabic' },
    { code: 'zho_Hans', name: 'Chinese (Simplified)' },
    { code: 'jpn_Jpan', name: 'Japanese' },
    { code: 'ita_Latn', name: 'Italian' },
    { code: 'nld_Latn', name: 'Dutch' },
    { code: 'pol_Latn', name: 'Polish' },
    { code: 'tur_Latn', name: 'Turkish' },
    { code: 'kor_Hang', name: 'Korean' },
    { code: 'tha_Thai', name: 'Thai' },
    { code: 'vie_Latn', name: 'Vietnamese' },
    { code: 'ind_Latn', name: 'Indonesian' },
    { code: 'msa_Latn', name: 'Malay' }
  ];

  return (
    <Form.Group className="mb-3">
      <Form.Label>{type} Language</Form.Label>
      <Form.Select
        value={defaultLanguage}
        onChange={onChange}
        size="lg"
        style={{ minWidth: '200px' }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default LanguageSelector;
