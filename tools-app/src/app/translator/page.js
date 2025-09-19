"use client";

import styles from "../page.module.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "@codethicket/react-ai-translator";
import { useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import Progress from "./progress";

export default function Translator() {
   // Inputs and outputs
   const [input, setInput] = useState('I love walking my dog.');
   const [sourceLanguage, setSourceLanguage] = useState('eng_Latn');
   const [targetLanguage, setTargetLanguage] = useState('fra_Latn');
   const [output, setOutput] = useState('');
 
   // Create a reference to the worker object.
   // const worker = useRef(null);
  //  const workerScript = new URL('./worker.js', import.meta.url); // Path to your worker file
 
   const { translate, translatedText, loading, progress, modelLoading } = useTranslation();
 
   useEffect(()=>{
     translate(input,
       sourceLanguage,
       targetLanguage)
   },[])
 
 
   return (
     <div>
       
       <h1>ML-powered multilingual translation in React on the browser (<i>no cost</i>)!</h1>
 
       <div className='container'>
         <div className='language-container'>
           <LanguageSelector type={"Source"} defaultLanguage={"eng_Latn"} onChange={x => setSourceLanguage(x.target.value)} />
           <LanguageSelector type={"Target"} defaultLanguage={"fra_Latn"} onChange={x => setTargetLanguage(x.target.value)} />
         </div>
 
         <div className='textbox-container'>
           <textarea value={input} rows={3} onChange={e => setInput(e.target.value)}></textarea>
           <div style={{width:'50%'}}>{translatedText}</div>
         </div>
       </div>
 
       <button className='translate-button' disabled={modelLoading||loading} onClick={()=>translate(input,
       sourceLanguage,
       targetLanguage)}>Translate</button>
 
 <div className='progress-bars-container'>
 {loading && (
           <label>{`Loading models... (happens only once, please be patient :))`}</label>
         )}
       
         {progress.map(data => (
           <div key={data.file}>
             <Progress text={data.file} percentage={data.progress} />
           </div>
         ))}
       </div>
     </div>
   )
}


    