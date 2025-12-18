import React, { createContext, useContext, useState, useEffect } from 'react';
import vkBridge from '@vkontakte/vk-bridge';

const TOKEN_STORAGE_KEY = 'user_tokens_balance_v2'; // Сменил ключ, чтобы начать с чистого листа

interface TokenContextType {
  tokens: number;
  addToken: () => void;
  spendToken: () => boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Начальное значение 1 (для новичков)
  const [tokens, setTokens] = useState<number>(1); 

  // --- ЗАГРУЗКА ДАННЫХ ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Сначала пробуем достать из localStorage (это быстрее и работает на ПК)
        const localData = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (localData) {
          setTokens(parseInt(localData, 10));
          console.log('💎 Токены загружены из LocalStorage:', localData);
        }

        // 2. Параллельно запрашиваем из облака VK (актуально для смены устройств)
        const vkData = await vkBridge.send('VKWebAppStorageGet', { keys: [TOKEN_STORAGE_KEY] });
        
        if (vkData.keys && vkData.keys[0] && vkData.keys[0].value) {
          const cloudTokens = parseInt(vkData.keys[0].value, 10);
          
          // Если в облаке данные новее или отличаются (например, юзер играл с телефона), берем их
          // Но тут простая логика: приоритет облаку, если оно есть
          setTokens(cloudTokens);
          
          // Синхронизируем локальное хранилище с облачным
          localStorage.setItem(TOKEN_STORAGE_KEY, cloudTokens.toString());
          console.log('💎 Токены синхронизированы с VK Storage:', cloudTokens);
        }
      } catch (error) {
        console.error('Ошибка загрузки токенов:', error);
      }
    };

    fetchData();
  }, []);

  // --- СОХРАНЕНИЕ ДАННЫХ ---
  const saveAll = (newValue: number) => {
    setTokens(newValue);
    
    // 1. Сохраняем в браузер (мгновенно)
    localStorage.setItem(TOKEN_STORAGE_KEY, newValue.toString());
    
    // 2. Сохраняем в облако VK (асинхронно)
    vkBridge.send('VKWebAppStorageSet', {
      key: TOKEN_STORAGE_KEY,
      value: newValue.toString()
    }).catch(e => console.log('Ошибка сохранения в VK:', e));
  };

  const addToken = () => {
    saveAll(tokens + 100);
  };

  const spendToken = () => {
    if (tokens >= 1) {
      saveAll(tokens - 1);
      return true;
    }
    return false;
  };

  return (
    <TokenContext.Provider value={{ tokens, addToken, spendToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};