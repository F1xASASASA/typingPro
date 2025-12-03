import React, { useEffect, useState } from 'react';
import style from './DailyMode.module.css';
import AllTypingScript from '../../AllTypingScript/AllTypingScript';

// Ссылка на твой PHP-прокси
const PROXY_URL = "https://midisbessmertnipolk.online/ai-proxy.php";
const PROMPT_ID = "fvt3idp10tsneila6o53";

const STORAGE_KEY = 'daily_mode_data';

interface DailyData {
  date: string;
  text: string;
}

const DailyMode: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const currentDate = new Date().toLocaleDateString('ru-RU');
  console.log("Текущая дата:", currentDate);

  useEffect(() => {
    loadDailyText();
  }, []);

  const loadDailyText = async () => {
    // 1. Определяем текущую дату
    const today = new Date().toLocaleDateString('ru-RU');
    
    // 2. Смотрим, что есть в локальном хранилище
    const storedDataString = localStorage.getItem(STORAGE_KEY);
    
    if (storedDataString) {
      const storedData: DailyData = JSON.parse(storedDataString);
      
      // Если даты совпадают — используем сохраненный текст
      if (storedData.date === today && storedData.text) {
        setText(storedData.text);
        setLoading(false);
        return;
      }
    }

    // 3. Если записи нет или дата устарела — делаем запрос к прокси
    await fetchNewDailyText(today);
  };

  const fetchNewDailyText = async (todayDate: string) => {
    setLoading(true);
    setError("");
    
    // Жестко заданный промт для ежедневного задания
    const dailyPromptInput = "Напиши текст до 400 символов не используя тире и ковычки, не начинай словом в далёкой, делай текст разнообразным, не повторяясь с тем что ты уже мог писать, и чтобы текст было ИНТЕРЕСНО читать и писать";

    const dataBody = {
      prompt: { id: PROMPT_ID },
      input: dailyPromptInput
    };

    try {
      // Запрос на твой сервер
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // Authorization удален
        },
        body: JSON.stringify(dataBody)
      });

      if (response.ok) {
        const result = await response.json();
        const aiText = result.output?.[0]?.content?.[0]?.text || result.result?.alternatives?.[0]?.message?.text;

        if (aiText) {
          // Чистим текст
          const cleanText = aiText.replace(/\n/g, ' ').trim();
          
          setText(cleanText);

          // 4. Сохраняем в localStorage
          const newData: DailyData = {
            date: todayDate,
            text: cleanText
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

        } else {
          setError("Нейросеть вернула пустой ответ.");
        }
      } else {
        setError(`Ошибка сервера: ${response.status}`);
      }
    } catch (e) {
      console.error(e);
      setError("Не удалось загрузить ежедневное задание. Проверьте интернет.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={style.dailyModeContainer}>
        <div className={style.loadingWrapper}>
          <div className={style.spinner}></div>
          <div>Генерируем задание на сегодня...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.dailyModeContainer}>
        <h2 className={style.dailyTitle}>Ошибка</h2>
        <div>{error}</div>
        <button onClick={() => window.location.reload()} style={{marginTop: 20, padding: '10px 20px'}}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className={style.dailyModeContainer}>
      <AllTypingScript text={text}/>
    </div>
  );
  
};

export default DailyMode;