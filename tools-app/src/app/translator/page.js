"use client";

import styles from "../page.module.css";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { useTranslation } from "@codethicket/react-ai-translator";

const LANGUAGES = {
  "Acehnese (Arabic script)": "ace_Arab",
  "Acehnese (Latin script)": "ace_Latn",
  Afrikaans: "afr_Latn",
  Akan: "aka_Latn",
  Amharic: "amh_Ethi",
  Armenian: "hye_Armn",
  Assamese: "asm_Beng",
  Asturian: "ast_Latn",
  Awadhi: "awa_Deva",
  "Ayacucho Quechua": "quy_Latn",
  Balinese: "ban_Latn",
  Bambara: "bam_Latn",
  "Banjar (Arabic script)": "bjn_Arab",
  "Banjar (Latin script)": "bjn_Latn",
  Bashkir: "bak_Cyrl",
  Basque: "eus_Latn",
  Belarusian: "bel_Cyrl",
  Bemba: "bem_Latn",
  Bengali: "ben_Beng",
  Bhojpuri: "bho_Deva",
  Bosnian: "bos_Latn",
  Buginese: "bug_Latn",
  Bulgarian: "bul_Cyrl",
  Burmese: "mya_Mymr",
  Catalan: "cat_Latn",
  Cebuano: "ceb_Latn",
  "Central Atlas Tamazight": "tzm_Tfng",
  "Central Aymara": "ayr_Latn",
  "Central Kanuri (Arabic script)": "knc_Arab",
  "Central Kanuri (Latin script)": "knc_Latn",
  "Central Kurdish": "ckb_Arab",
  Chhattisgarhi: "hne_Deva",
  "Chinese (Simplified)": "zho_Hans",
  "Chinese (Traditional)": "zho_Hant",
  Chokwe: "cjk_Latn",
  "Crimean Tatar": "crh_Latn",
  Croatian: "hrv_Latn",
  Czech: "ces_Latn",
  Danish: "dan_Latn",
  Dari: "prs_Arab",
  Dutch: "nld_Latn",
  Dyula: "dyu_Latn",
  Dzongkha: "dzo_Tibt",
  "Eastern Panjabi": "pan_Guru",
  "Eastern Yiddish": "ydd_Hebr",
  "Egyptian Arabic": "arz_Arab",
  English: "eng_Latn",
  Esperanto: "epo_Latn",
  Estonian: "est_Latn",
  Ewe: "ewe_Latn",
  Faroese: "fao_Latn",
  Fijian: "fij_Latn",
  Finnish: "fin_Latn",
  Fon: "fon_Latn",
  French: "fra_Latn",
  Friulian: "fur_Latn",
  Galician: "glg_Latn",
  Ganda: "lug_Latn",
  Georgian: "kat_Geor",
  German: "deu_Latn",
  Greek: "ell_Grek",
  Guarani: "grn_Latn",
  Gujarati: "guj_Gujr",
  "Haitian Creole": "hat_Latn",
  "Halh Mongolian": "khk_Cyrl",
  Hausa: "hau_Latn",
  Hebrew: "heb_Hebr",
  Hindi: "hin_Deva",
  Hungarian: "hun_Latn",
  Icelandic: "isl_Latn",
  Igbo: "ibo_Latn",
  Ilocano: "ilo_Latn",
  Indonesian: "ind_Latn",
  Irish: "gle_Latn",
  Italian: "ita_Latn",
  Japanese: "jpn_Jpan",
  Javanese: "jav_Latn",
  Jingpho: "kac_Latn",
  Kabiyè: "kbp_Latn",
  Kabuverdianu: "kea_Latn",
  Kabyle: "kab_Latn",
  Kamba: "kam_Latn",
  Kannada: "kan_Knda",
  "Kashmiri (Arabic script)": "kas_Arab",
  "Kashmiri (Devanagari script)": "kas_Deva",
  Kazakh: "kaz_Cyrl",
  Khmer: "khm_Khmr",
  Kikongo: "kon_Latn",
  Kikuyu: "kik_Latn",
  Kimbundu: "kmb_Latn",
  Kinyarwanda: "kin_Latn",
  Korean: "kor_Hang",
  Kyrgyz: "kir_Cyrl",
  Lao: "lao_Laoo",
  Latgalian: "ltg_Latn",
  Ligurian: "lij_Latn",
  Limburgish: "lim_Latn",
  Lingala: "lin_Latn",
  Lithuanian: "lit_Latn",
  Lombard: "lmo_Latn",
  "Luba-Kasai": "lua_Latn",
  Luo: "luo_Latn",
  Luxembourgish: "ltz_Latn",
  Macedonian: "mkd_Cyrl",
  Magahi: "mag_Deva",
  Maithili: "mai_Deva",
  Malayalam: "mal_Mlym",
  Maltese: "mlt_Latn",
  Maori: "mri_Latn",
  Marathi: "mar_Deva",
  "Meitei (Bengali script)": "mni_Beng",
  "Mesopotamian Arabic": "acm_Arab",
  "Minangkabau (Arabic script)": "min_Arab",
  "Minangkabau (Latin script)": "min_Latn",
  Mizo: "lus_Latn",
  "Modern Standard Arabic (Romanized)": "arb_Latn",
  "Modern Standard Arabic": "arb_Arab",
  "Moroccan Arabic": "ary_Arab",
  Mossi: "mos_Latn",
  "Najdi Arabic": "ars_Arab",
  Nepali: "npi_Deva",
  "Nigerian Fulfulde": "fuv_Latn",
  "North Azerbaijani": "azj_Latn",
  "North Levantine Arabic": "apc_Arab",
  "Northern Kurdish": "kmr_Latn",
  "Northern Sotho": "nso_Latn",
  "Northern Uzbek": "uzn_Latn",
  "Norwegian Bokmål": "nob_Latn",
  "Norwegian Nynorsk": "nno_Latn",
  Nuer: "nus_Latn",
  Nyanja: "nya_Latn",
  Occitan: "oci_Latn",
  Odia: "ory_Orya",
  Pangasinan: "pag_Latn",
  Papiamento: "pap_Latn",
  "Plateau Malagasy": "plt_Latn",
  Polish: "pol_Latn",
  Portuguese: "por_Latn",
  Romanian: "ron_Latn",
  Rundi: "run_Latn",
  Russian: "rus_Cyrl",
  Samoan: "smo_Latn",
  Sango: "sag_Latn",
  Sanskrit: "san_Deva",
  Santali: "sat_Olck",
  Sardinian: "srd_Latn",
  "Scottish Gaelic": "gla_Latn",
  Serbian: "srp_Cyrl",
  Shan: "shn_Mymr",
  Shona: "sna_Latn",
  Sicilian: "scn_Latn",
  Silesian: "szl_Latn",
  Sindhi: "snd_Arab",
  Sinhala: "sin_Sinh",
  Slovak: "slk_Latn",
  Slovenian: "slv_Latn",
  Somali: "som_Latn",
  "South Azerbaijani": "azb_Arab",
  "South Levantine Arabic": "ajp_Arab",
  "Southern Pashto": "pbt_Arab",
  "Southern Sotho": "sot_Latn",
  "Southwestern Dinka": "dik_Latn",
  Spanish: "spa_Latn",
  "Standard Latvian": "lvs_Latn",
  "Standard Malay": "zsm_Latn",
  "Standard Tibetan": "bod_Tibt",
  Sundanese: "sun_Latn",
  Swahili: "swh_Latn",
  Swati: "ssw_Latn",
  Swedish: "swe_Latn",
  Tagalog: "tgl_Latn",
  Tajik: "tgk_Cyrl",
  "Tamasheq (Latin script)": "taq_Latn",
  "Tamasheq (Tifinagh script)": "taq_Tfng",
  Tamil: "tam_Taml",
  Tatar: "tat_Cyrl",
  "Ta’izzi-Adeni Arabic": "acq_Arab",
  Telugu: "tel_Telu",
  Thai: "tha_Thai",
  Tigrinya: "tir_Ethi",
  "Tok Pisin": "tpi_Latn",
  "Tosk Albanian": "als_Latn",
  Tsonga: "tso_Latn",
  Tswana: "tsn_Latn",
  Tumbuka: "tum_Latn",
  "Tunisian Arabic": "aeb_Arab",
  Turkish: "tur_Latn",
  Turkmen: "tuk_Latn",
  Twi: "twi_Latn",
  Ukrainian: "ukr_Cyrl",
  Umbundu: "umb_Latn",
  Urdu: "urd_Arab",
  Uyghur: "uig_Arab",
  Venetian: "vec_Latn",
  Vietnamese: "vie_Latn",
  Waray: "war_Latn",
  Welsh: "cym_Latn",
  "West Central Oromo": "gaz_Latn",
  "Western Persian": "pes_Arab",
  Wolof: "wol_Latn",
  Xhosa: "xho_Latn",
  Yoruba: "yor_Latn",
  "Yue Chinese": "yue_Hant",
  Zulu: "zul_Latn",
};

function LanguageSelector({ type, onChange, defaultLanguage }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{type} Language</Form.Label>
      <Form.Select
        onChange={onChange}
        defaultValue={defaultLanguage}
        size="lg"
        style={{ minWidth: '200px' }}
      >
        {Object.entries(LANGUAGES).map(([key, value]) => {
          return (
            <option key={key} value={value}>
              {key}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );  
}

function Progress({ text, percentage }) {
  percentage = percentage ?? 0;
  return (
    <div className="mb-2">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-muted">{text}</small>
        <small className="text-muted">{percentage.toFixed(1)}%</small>
      </div>
      <div className="progress" style={{ height: '8px' }}>
        <div 
          className="progress-bar bg-primary" 
          role="progressbar" 
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage} 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

export default function Translator() {
  // Inputs and outputs
  const [input, setInput] = useState("I love walking my dog.");
  const [sourceLanguage, setSourceLanguage] = useState("eng_Latn");
  const [targetLanguage, setTargetLanguage] = useState("fra_Latn");
  const [output, setOutput] = useState("");

  // Create a reference to the worker object.
  // const worker = useRef(null);
  //  const workerScript = new URL('./worker.js', import.meta.url); // Path to your worker file

  const { translate, translatedText, loading, progress, modelLoading } =
    useTranslation();

  useEffect(() => {
    translate(input, sourceLanguage, targetLanguage);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Translator</h1>
        <p className="text-muted" style={{ marginTop: -16 }}>
          ML-powered multilingual translation on the browser (no cost)!
        </p>

        <Container style={{ width: '100%', maxWidth: '800px' }}>
          <Row className="mb-4">
            <Col md={6}>
              <LanguageSelector
                type="Source"
                defaultLanguage="eng_Latn"
                onChange={(x) => setSourceLanguage(x.target.value)}
              />
            </Col>
            <Col md={6}>
              <LanguageSelector
                type="Target"
                defaultLanguage="fra_Latn"
                onChange={(x) => setTargetLanguage(x.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Text to translate</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to translate..."
                  disabled={loading || modelLoading}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Translated text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={translatedText}
                  readOnly
                  placeholder="Translation will appear here..."
                  style={{ backgroundColor: '#f8f9fa' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mb-4">
            <Button
              variant="primary"
              size="lg"
              disabled={modelLoading || loading || !input.trim()}
              onClick={() => translate(input, sourceLanguage, targetLanguage)}
            >
              {modelLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Loading model...
                </>
              ) : loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Translating...
                </>
              ) : (
                'Translate'
              )}
            </Button>
          </div>

          {progress.length > 0 && (
            <div className="mb-4">
              <h6 className="text-muted mb-3">Loading Progress</h6>
              {progress.map((data, index) => (
                <div key={index}>
                  <Progress text={data.file} percentage={data.progress} />
                </div>
              ))}
            </div>
          )}
        </Container>
      </main>
      <footer className={styles.footer}>
        <p>copyright 2025. Developed by Mayur Vijay Kode.</p>
      </footer>
    </div>
  );
}
