import React, { useState } from 'react';
import style from './AIMode.module.css';
import AllTypingScript from '../../AllTypingScript/AllTypingScript';
import { useTokens } from '../../../context/TokenContext';
import TokenIcon from '../../TokenIcon';

const PROXY_URL = "https://midisbessmertnipolk.online/ai-proxy.php";
const PROMPT_ID = "fvt3idp10tsneila6o53";

const AIMode: React.FC = () => {
  const { tokens, spendToken } = useTokens();
  
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    if (tokens < 1) {
      alert("Недостаточно монет! \nПроходите обычные уровни, чтобы заработать.");
      return;
    }
    const success = spendToken();
    if (!success) return; 

    setIsLoading(true);
    setError("");
    setGeneratedText(null);

    const dataBody = {
      prompt: { id: PROMPT_ID },
      input: inputText
    };

    try {
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataBody)
      });

      if (response.ok) {
        const result = await response.json();
        const textResponse = result.output?.[0]?.content?.[0]?.text || result.result?.alternatives?.[0]?.message?.text;

        if (textResponse) {
          setGeneratedText(textResponse.replace(/\n/g, ' '));
        } else {
          setError("Нейросеть вернула пустой ответ.");
        }
      } else {
        setError(`Ошибка сервера: ${response.status}`);
      }
    } catch (e) {
      setError("Ошибка сети.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedText(null);
    setInputText("");
  };

  return (
    <div className={style.aiModeContainer}>
      {!generatedText && (
        <div className={style.inputWrapper}>
          <h2 className={style.aiTitle}>Нейросеть: Выберите тему</h2>
          <div style={{ color: '#a0a0c0', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            Цена генерации: <b style={{color: '#FFD700'}}>1</b> <TokenIcon size={18} /> (У вас: {tokens})
          </div>
          <input 
            type="text" className={style.topicInput} placeholder="Например: История про космического кота"
            value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button className={style.generateButton} onClick={handleGenerate} disabled={isLoading || tokens < 1} style={{ opacity: tokens < 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {isLoading ? "Думаю..." : (<>Сгенерировать за 1 <TokenIcon size={22} /></>)}
          </button>
          {tokens < 1 && (
             <div style={{ marginTop: '12px', color: '#FF5A78', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
               Пройдите любой тест в Классике, чтобы получить <TokenIcon size={16} />
             </div>
          )}
          {error && <div className={style.errorText}>{error}</div>}
        </div>
      )}

      {generatedText && (
          <>
          
        <AllTypingScript 
          text={generatedText} 
          onBack={handleReset}/>
       
          <button onClick={handleReset} style={{marginBottom: '20px', background: 'transparent', border: '1px solid #555', color:'#fff', padding: '5px 10px', borderRadius:'10px', cursor:'pointer'}}>
            Выбрать другую тему
          </button>
        </>
      )}
    </div>
  );
};

export default AIMode;