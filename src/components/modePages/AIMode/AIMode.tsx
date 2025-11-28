import React, { useState } from 'react';
import style from './AIMode.module.css';
import AllTypingScript from '../../AllTypingScript/AllTypingScript';

// ТВОИ ДАННЫЕ ИЗ PYTHON СКРИПТА
const API_KEY = "AQVN2bO6XJGfWdVb-1ETP6RATVFOmUvBIxFSfNK5";
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

    const url = "/yandex-api/v1/responses";

    const dataBody = {
      prompt: {
        id: PROMPT_ID
      },
      input: inputText
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Api-Key ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataBody)
      });

      if (response.ok) {
        const result = await response.json();
        // Путь к тексту: output -> [0] -> content -> [0] -> text
        const textResponse = result.output?.[0]?.content?.[0]?.text;

        if (textResponse) {
          // Очищаем текст от лишних переносов строк, если нужно
          setGeneratedText(textResponse.replace(/\n/g, ' '));
        } else {
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
           {/* Кнопка "Назад" или "Новая тема" может быть добавлена здесь, 
               но AllTypingScript имеет свою кнопку рестарта. 
               Мы можем добавить кнопку сброса выше тренажера, если нужно. */}
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