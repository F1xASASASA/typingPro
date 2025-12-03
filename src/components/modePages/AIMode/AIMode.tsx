import React, { useState } from 'react';
import style from './AIMode.module.css';
import AllTypingScript from '../../AllTypingScript/AllTypingScript';

// Ссылка на твой PHP-прокси на Reg.ru
const PROXY_URL = "https://midisbessmertnipolk.online/ai-proxy.php";
// ID промта (его можно оставить на клиенте, это не секрет)
const PROMPT_ID = "fvt3idp10tsneila6o53";

const AIMode: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError("");
    setGeneratedText(null);

    const dataBody = {
      prompt: {
        id: PROMPT_ID
      },
      input: inputText
    };

    try {
      // Делаем запрос на ТВОЙ сервер, а не в Яндекс напрямую
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: {
          // Authorization здесь больше не нужен, он внутри PHP файла
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataBody)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Пытаемся достать текст. Структура зависит от того, как отвечает Яндекс через PHP
        // Обычно это result.output[0]... или result.result...
        const textResponse = result.output?.[0]?.content?.[0]?.text || result.result?.alternatives?.[0]?.message?.text;

        if (textResponse) {
          // Очищаем текст от лишних переносов строк
          setGeneratedText(textResponse.replace(/\n/g, ' '));
        } else {
          console.log("Ответ сервера:", result);
          setError("Нейросеть вернула пустой ответ.");
        }
      } else {
        setError(`Ошибка сервера: ${response.status}`);
      }
    } catch (e) {
      setError("Ошибка сети или запроса.");
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
      {/* Если текст еще не сгенерирован, показываем форму ввода */}
      {!generatedText && (
        <div className={style.inputWrapper}>
          <h2 className={style.aiTitle}>Нейросеть: Выберите тему</h2>
          
          <input 
            type="text" 
            className={style.topicInput}
            placeholder="Например: История про космического кота"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          
          <button 
            className={style.generateButton} 
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? "Думаю..." : "Сгенерировать"}
          </button>

          {error && <div className={style.errorText}>{error}</div>}
        </div>
      )}

      {/* Если текст готов, запускаем тренажер */}
      {generatedText && (
        <>
           <button onClick={handleReset} style={{marginBottom: '20px', background: 'transparent', border: '1px solid #555', color:'#fff', padding: '5px 10px', borderRadius:'10px', cursor:'pointer'}}>
             ← Выбрать другую тему
           </button>
           <AllTypingScript text={generatedText} />
        </>
      )}
    </div>
  );
};

export default AIMode;