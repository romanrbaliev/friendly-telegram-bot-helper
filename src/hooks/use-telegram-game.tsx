
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGameState, GameState } from './useGameState';

interface TelegramGameContextType {
  gameState: ReturnType<typeof useGameState>;
  telegramUser: {
    id: number;
    username?: string;
    firstName: string;
    lastName?: string;
  } | null;
  isInTelegram: boolean;
  saveGameToTelegram: () => Promise<void>;
  loadGameFromTelegram: () => Promise<void>;
}

const TelegramGameContext = createContext<TelegramGameContextType | undefined>(undefined);

export const TelegramGameProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const gameState = useGameState();
  const [telegramUser, setTelegramUser] = useState<TelegramGameContextType['telegramUser']>(null);
  const [isInTelegram, setIsInTelegram] = useState(false);
  
  // Определяем, запущена ли игра в Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      setIsInTelegram(true);
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Получаем данные пользователя
      if (window.Telegram.WebApp.initDataUnsafe.user) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        setTelegramUser({
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name
        });
      }
      
      // Пытаемся загрузить игру
      loadGameFromTelegram();
    }
  }, []);
  
  // Сохраняем игру при изменении состояния, если мы в Telegram
  useEffect(() => {
    if (isInTelegram) {
      const saveTimeout = setTimeout(() => {
        saveGameToTelegram();
      }, 5000); // Сохраняем каждые 5 секунд
      
      return () => clearTimeout(saveTimeout);
    }
  }, [gameState.getFullState()]);
  
  // Функция сохранения игры
  const saveGameToTelegram = async () => {
    if (!isInTelegram || !telegramUser) return;
    
    // Здесь должна быть отправка данных на сервер
    console.log('Сохранение игры для пользователя:', telegramUser.id);
    // Пример: fetch('/api/save-game', { method: 'POST', body: JSON.stringify({ userId: telegramUser.id, gameState: gameState.getFullState() }) });
  };
  
  // Функция загрузки игры
  const loadGameFromTelegram = async () => {
    if (!isInTelegram || !telegramUser) return;
    
    // Здесь должна быть загрузка данных с сервера
    console.log('Загрузка игры для пользователя:', telegramUser.id);
    // Пример: const response = await fetch(`/api/load-game?userId=${telegramUser.id}`);
    // const savedState = await response.json();
    // И затем восстановление состояния
  };
  
  return (
    <TelegramGameContext.Provider value={{
      gameState,
      telegramUser,
      isInTelegram,
      saveGameToTelegram,
      loadGameFromTelegram
    }}>
      {children}
    </TelegramGameContext.Provider>
  );
};

export const useTelegramGame = () => {
  const context = useContext(TelegramGameContext);
  if (context === undefined) {
    throw new Error('useTelegramGame must be used within a TelegramGameProvider');
  }
  return context;
};
