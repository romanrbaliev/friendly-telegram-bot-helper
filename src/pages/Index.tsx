
import React, { useState, useEffect } from 'react';
import CryptoGame from '@/components/game/CryptoGame';
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from '@/hooks/use-mobile';
import { TelegramGameProvider } from '@/hooks/use-telegram-game';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Инициализация Telegram Mini App
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
    
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
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
      ) : (
        <TelegramGameProvider>
          <CryptoGame />
        </TelegramGameProvider>
      )}
      <Toaster />
    </div>
  );
};

export default Index;
