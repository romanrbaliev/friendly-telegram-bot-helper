
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGameState, GameState } from './useGameState';
import { toast } from "@/components/ui/use-toast";

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
        
        toast({
          title: "Подключено к Telegram",
          description: `Добро пожаловать, ${user.first_name}!`,
          duration: 3000
        });
      }
      
      // Пытаемся загрузить игру
      loadGameFromTelegram();
      
      // Настраиваем кнопку "Готово" в Telegram WebApp
      window.Telegram.WebApp.MainButton.setText('СОХРАНИТЬ ПРОГРЕСС');
      window.Telegram.WebApp.MainButton.show();
      
      // При нажатии на кнопку сохраняем прогресс
      window.Telegram.WebApp.MainButton.onClick(() => {
        saveGameToTelegram();
        window.Telegram.WebApp.showPopup({
          title: 'Сохранено',
          message: 'Ваш прогресс сохранен!',
          buttons: [{type: 'ok'}]
        });
      });
    }
  }, []);
  
  // Сохраняем игру при изменении состояния, если мы в Telegram
  useEffect(() => {
    if (isInTelegram && telegramUser) {
      const saveTimeout = setTimeout(() => {
        saveGameToTelegram();
      }, 60000); // Автосохранение каждую минуту
      
      return () => clearTimeout(saveTimeout);
    }
  }, [gameState.dollars, gameState.usdt, gameState.btc, gameState.stakedUsdt, gameState.knowledge]);
  
  // Функция сохранения игры
  const saveGameToTelegram = async () => {
    if (!isInTelegram || !telegramUser) return;
    
    try {
      // Здесь мы можем отправить данные через Telegram WebApp
      const gameData = gameState.getFullState();
      
      // Сохраняем в localStorage с идентификатором пользователя Telegram
      localStorage.setItem(`tg_game_${telegramUser.id}`, JSON.stringify(gameData));
      
      // Если пользователь нажал на кнопку сохранения, отправляем данные в бот
      if (window.Telegram.WebApp.MainButton.isActive) {
        // Отправляем базовую информацию об игре в бот
        const basicData = {
          userId: telegramUser.id,
          dollars: gameState.dollars,
          usdt: gameState.usdt,
          btc: gameState.btc,
          knowledge: gameState.knowledge,
          timestamp: Date.now()
        };
        
        window.Telegram.WebApp.sendData(JSON.stringify(basicData));
      }
      
      console.log('Игра сохранена для пользователя:', telegramUser.id);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };
  
  // Функция загрузки игры
  const loadGameFromTelegram = async () => {
    if (!isInTelegram || !telegramUser) return;
    
    try {
      // Загружаем из localStorage с идентификатором пользователя Telegram
      const savedData = localStorage.getItem(`tg_game_${telegramUser.id}`);
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Восстанавливаем состояние игры
        gameState.setDollars(parsedData.dollars || 0);
        gameState.setUsdt(parsedData.usdt || 0);
        gameState.setBtc(parsedData.btc || 0);
        gameState.setStakedUsdt(parsedData.stakedUsdt || 0);
        gameState.setKnowledge(parsedData.knowledge || 0);
        gameState.setMiningPower(parsedData.miningPower || 0);
        
        // Устанавливаем флаги открытия функций
        gameState.setShowResources(parsedData.showResources || false);
        gameState.setShowBuyCrypto(parsedData.showBuyCrypto || false);
        gameState.setShowBuyUsdt(parsedData.showBuyUsdt || false);
        gameState.setShowStaking(parsedData.showStaking || false);
        gameState.setShowTrading(parsedData.showTrading || false);
        gameState.setShowEducation(parsedData.showEducation || false);
        gameState.setShowMining(parsedData.showMining || false);
        gameState.setShowCareer(parsedData.showCareer || false);
        gameState.setShowMarketEvents(parsedData.showMarketEvents || false);
        
        // Устанавливаем статистику
        gameState.setClicks(parsedData.clicks || 0);
        
        // Устанавливаем роль
        if (parsedData.role) {
          gameState.setRole(parsedData.role);
        }
        
        console.log('Игра загружена для пользователя:', telegramUser.id);
        
        // Показываем уведомление
        toast({
          title: "Прогресс загружен",
          description: "Ваш предыдущий прогресс восстановлен.",
          duration: 3000
        });
      } else {
        console.log('Сохранение не найдено, начинаем новую игру');
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
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
