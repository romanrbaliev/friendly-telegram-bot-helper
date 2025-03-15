
import React, { useState, useEffect } from 'react';
import CryptoGame from '@/components/game/CryptoGame';
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from '@/hooks/use-mobile';
import TelegramInfoPage from '@/components/telegram/TelegramInfoPage';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const [showTelegramInfo, setShowTelegramInfo] = useState(false);
  
  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Проверяем, запущено ли приложение в Telegram WebApp
  useEffect(() => {
    const isTelegramWebApp = window.Telegram && window.Telegram.WebApp;
    
    if (isTelegramWebApp) {
      // Если запущено в Telegram, показываем игру
      setShowTelegramInfo(false);
    } else {
      // Иначе показываем инструкцию по подключению к Telegram
      setShowTelegramInfo(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gradient mb-4">Crypto Clicker</h1>
            <div className="w-32 h-2 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded">
              <div className="h-full w-1/2 bg-white animate-pulse rounded"></div>
            </div>
            <p className="mt-4 text-gray-400">Загрузка игры...</p>
          </div>
        </div>
      ) : showTelegramInfo ? (
        <TelegramInfoPage />
      ) : (
        <CryptoGame />
      )}
      <Toaster />
    </div>
  );
};

export default Index;
