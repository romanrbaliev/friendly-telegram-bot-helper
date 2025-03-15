
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { GameState } from './useGameState';

const SAVE_KEY = 'crypto_clicker_save_data';

interface UseSaveGameProps {
  gameState: GameState;
  setShowWelcomePopup: (show: boolean) => void;
  setDollars: (value: React.SetStateAction<number>) => void;
  setUsdt: (value: React.SetStateAction<number>) => void;
  setBtc: (value: React.SetStateAction<number>) => void;
  setStakedUsdt: (value: React.SetStateAction<number>) => void;
  setKnowledge: (value: React.SetStateAction<number>) => void;
  setMiningPower: (value: React.SetStateAction<number>) => void;
  setRole: (value: React.SetStateAction<string | null>) => void;
  setShowResources: (value: React.SetStateAction<boolean>) => void;
  setShowBuyCrypto: (value: React.SetStateAction<boolean>) => void;
  setShowStaking: (value: React.SetStateAction<boolean>) => void;
  setShowTrading: (value: React.SetStateAction<boolean>) => void;
  setShowEducation: (value: React.SetStateAction<boolean>) => void;
  setShowMining: (value: React.SetStateAction<boolean>) => void;
  setShowCareer: (value: React.SetStateAction<boolean>) => void;
  setShowMarketEvents: (value: React.SetStateAction<boolean>) => void;
  setClicks: (value: React.SetStateAction<number>) => void;
}

export const useSaveGame = ({
  gameState,
  setShowWelcomePopup,
  setDollars,
  setUsdt,
  setBtc,
  setStakedUsdt,
  setKnowledge,
  setMiningPower,
  setRole,
  setShowResources,
  setShowBuyCrypto,
  setShowStaking,
  setShowTrading,
  setShowEducation,
  setShowMining,
  setShowCareer,
  setShowMarketEvents,
  setClicks
}: UseSaveGameProps) => {
  // Загрузка сохранения при старте
  useEffect(() => {
    const savedData = localStorage.getItem(SAVE_KEY);
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        
        // Загружаем основные ресурсы
        setDollars(parsedData.dollars || 0);
        setUsdt(parsedData.usdt || 0);
        setBtc(parsedData.btc || 0);
        setStakedUsdt(parsedData.stakedUsdt || 0);
        setKnowledge(parsedData.knowledge || 0);
        setMiningPower(parsedData.miningPower || 0);
        
        // Загружаем флаги открытия функций
        setShowResources(parsedData.showResources || false);
        setShowBuyCrypto(parsedData.showBuyCrypto || false);
        setShowStaking(parsedData.showStaking || false);
        setShowTrading(parsedData.showTrading || false);
        setShowEducation(parsedData.showEducation || false);
        setShowMining(parsedData.showMining || false);
        setShowCareer(parsedData.showCareer || false);
        setShowMarketEvents(parsedData.showMarketEvents || false);
        
        // Загружаем статистику
        setClicks(parsedData.clicks || 0);
        
        // Загружаем специализацию
        if (parsedData.role) {
          setRole(parsedData.role);
        }
        
        // Не показываем приветствие если игрок уже играл
        if (parsedData.dollars > 0 || parsedData.usdt > 0 || parsedData.btc > 0) {
          setShowWelcomePopup(false);
        }
        
        toast({
          title: "Прогресс загружен!",
          description: "Ваш предыдущий прогресс успешно восстановлен.",
          duration: 3000
        });
      } catch (error) {
        console.error("Ошибка при загрузке сохранения:", error);
      }
    }
  }, []);
  
  // Автосохранение каждые 30 секунд
  useEffect(() => {
    const saveInterval = setInterval(() => {
      const gameData = {
        ...gameState,
        lastSaved: Date.now()
      };
      
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameData));
    }, 30000);
    
    return () => clearInterval(saveInterval);
  }, [gameState]);
  
  // Добавляем логи для отладки состояния игры
  useEffect(() => {
    console.log('Game state updated:', {
      dollars: gameState.dollars,
      usdt: gameState.usdt,
      btc: gameState.btc,
      knowledge: gameState.knowledge,
      showResources: gameState.showResources,
      showBuyCrypto: gameState.showBuyCrypto,
      showStaking: gameState.showStaking,
      showTrading: gameState.showTrading,
      showEducation: gameState.showEducation,
      showMining: gameState.showMining
    });
  }, [gameState]);
};
