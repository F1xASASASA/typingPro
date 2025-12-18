import React, { useState } from 'react';
import style from './AIMode.module.css';
import AllTypingScript from '../../AllTypingScript/AllTypingScript';
import { useTokens } from '../../../context/TokenContext'; // Импортируем контекст токенов

// Ссылка на твой PHP-прокси (ОСТАВИЛ КАК БЫЛО)
const PROXY_URL = "https://midisbessmertnipolk.online/ai-proxy.php";
const PROMPT_ID = "fvt3idp10tsneila6o53";

const AIMode: React.FC = () => {
  // Достаем токены и функцию списания
  const { tokens, spendToken } = useTokens();

  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    // --- ЛОГИКА ТОКЕНОВ ---
    // 1. Проверяем баланс
    if (tokens < 1) {
      alert("Недостаточно токенов! 💎\nПроходите обычные уровни или ежедневные задания, чтобы заработать токены.");
      return;
    }

    // 2. Списываем токен
    const success = spendToken();
    if (!success) return; // На всякий случай
    // ----------------------

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
      // --- ТВОЙ ЗАПРОС К PHP СЕРВЕРУ (БЕЗ ИЗМЕНЕНИЙ) ---
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataBody)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Достаем текст (как в твоем коде)
        const textResponse = result.output?.[0]?.content?.[0]?.text || result.result?.alternatives?.[0]?.message?.text;

        if (textResponse) {
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
      {!generatedText && (
        <div className={style.inputWrapper}>
          <h2 className={style.aiTitle}>Нейросеть: Выберите тему</h2>
          
          {/* Инфо о стоимости */}
          <div style={{ color: '#a0a0c0', marginBottom: '10px' }}>
            Цена генерации: <b>1 токен 💎</b> (У вас: {tokens})
          </div>

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
            // Блокируем кнопку, если идет загрузка ИЛИ нет токенов
            disabled={isLoading || tokens < 1}
            style={{ opacity: tokens < 1 ? 0.5 : 1 }}
          >
            {isLoading ? "Думаю..." : "Сгенерировать за 1 💎"}
          </button>

          {/* Подсказка, если нет токенов */}
          {tokens < 1 && (
             <div style={{ marginTop: '10px', color: '#FF5A78', fontSize: '14px' }}>
               Пройдите любой тест в Классическом режиме, чтобы получить токены!
             </div>
          )}

          {error && <div className={style.errorText}>{error}</div>}
        </div>
      )}

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