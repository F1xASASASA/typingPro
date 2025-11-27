import React, { useEffect, useState } from 'react';
import style from './DailyMode.module.css';
import AllTypingScript from '../../AllTypingScript/AllTypingScript';

// ТВОИ ДАННЫЕ
const API_KEY = "AQVN2bO6XJGfWdVb-1ETP6RATVFOmUvBIxFSfNK5";
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

  useEffect(() => {
    loadDailyText();
  }, []);

  const loadDailyText = async () => {
    // 1. Определяем текущую дату (формат ДД.ММ.ГГГГ)
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

    // 3. Если записи нет или дата устарела — делаем запрос к AI
    await fetchNewDailyText(today);
  };

  const fetchNewDailyText = async (todayDate: string) => {
    setLoading(true);
    setError("");

    // Используем наш PROXY путь
    const url = "/yandex-api/v1/responses"; 
    
    // Жестко заданный промт для ежедневного задания
    const dailyPromptInput = "Напиши интересный научный или исторический факт объемом 3-4 предложения для тренировки печати. Не используй списки, только сплошной текст.";

    const dataBody = {
      prompt: { id: PROMPT_ID },
      input: dailyPromptInput
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
        const aiText = result.output?.[0]?.content?.[0]?.text;

        if (aiText) {
          // Чистим текст от лишних переносов
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
      <h2 className={style.dailyTitle}>
        Задание на <span className={style.dailyDate}>{new Date().toLocaleDateString('ru-RU')}</span>
      </h2>
      <AllTypingScript text={text}/>
    </div>
  );
};

export default DailyMode;