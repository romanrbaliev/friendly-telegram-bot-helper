
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface UseGameEffectsProps {
  dollars: number;
  usdt: number;
  stakedUsdt: number;
  miningPower: number;
  setUsdt: (value: (prev: number) => number) => void;
  setBtc: (value: (prev: number) => number) => void;
  showResources: boolean;
  showTrading: boolean; 
  showEducation: boolean;
  showMining: boolean;
  showCareer: boolean;
  showMarketEvents: boolean;
  setShowTrading: (value: boolean) => void;
  setShowEducation: (value: boolean) => void;
  setShowMining: (value: boolean) => void;
  setShowMarketEvents: (value: boolean) => void;
  setShowResources: (value: boolean) => void;
  setShowBuyCrypto: (value: boolean) => void;
  setShowStaking: (value: boolean) => void;
  clicks: number;
  marketMultiplier: number;
  knowledge: number;
  setKnowledge: (value: (prev: number) => number) => void;
  setDollars: (value: (prev: number) => number) => void;
}

export function useGameEffects({
  dollars,
  usdt,
  stakedUsdt,
  miningPower,
  setUsdt,
  setBtc,
  showResources,
  showTrading, 
  showEducation,
  showMining,
  showCareer,
  showMarketEvents,
  setShowTrading,
  setShowEducation,
  setShowMining,
  setShowMarketEvents,
  setShowResources,
  setShowBuyCrypto,
  setShowStaking,
  clicks,
  marketMultiplier,
  knowledge,
  setKnowledge,
  setDollars
}: UseGameEffectsProps) {
  
  // Временный бонус: бычий рынок
  const [bullMarketActive, setBullMarketActive] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState(Date.now());
  
  // Эффект стейкинга
  useEffect(() => {
    let stakingInterval: NodeJS.Timeout | null = null;
    
    if (stakedUsdt > 0) {
      stakingInterval = setInterval(() => {
        const reward = stakedUsdt * 0.001 * (bullMarketActive ? 1.5 : 1);
        setUsdt(prev => prev + reward);
      }, 10000);
    }
    
    return () => {
      if (stakingInterval) clearInterval(stakingInterval);
    };
  }, [stakedUsdt, setUsdt, bullMarketActive]);
  
  // Эффект майнинга
  useEffect(() => {
    let miningInterval: NodeJS.Timeout | null = null;
    
    if (miningPower > 0) {
      miningInterval = setInterval(() => {
        const mined = miningPower * 0.00001 * marketMultiplier * (bullMarketActive ? 1.5 : 1);
        setBtc(prev => prev + mined);
      }, 10000);
    }
    
    return () => {
      if (miningInterval) clearInterval(miningInterval);
    };
  }, [miningPower, setBtc, marketMultiplier, bullMarketActive]);
  
  // Эффект пассивного дохода
  useEffect(() => {
    const currentTime = Date.now();
    const timeDiff = (currentTime - lastTimestamp) / 1000; // в секундах
    setLastTimestamp(currentTime);
    
    // Если прошло значительное время (2+ секунды), рассчитываем пассивный доход
    if (timeDiff > 2) {
      // Пассивный доход от стейкинга USDT
      if (stakedUsdt > 0) {
        const passiveReward = (stakedUsdt * 0.001 * timeDiff / 10) * (bullMarketActive ? 1.5 : 1);
        if (passiveReward > 0.01) {
          setUsdt(prev => prev + passiveReward);
        }
      }
      
      // Пассивный доход от майнинга BTC
      if (miningPower > 0) {
        const passiveMined = (miningPower * 0.00001 * marketMultiplier * timeDiff / 10) * (bullMarketActive ? 1.5 : 1);
        if (passiveMined > 0.00000001) {
          setBtc(prev => prev + passiveMined);
        }
      }
    }
    
    // Обновляем статус рынка (случайный шанс бычьего рынка)
    const randomEvent = Math.random();
    if (randomEvent < 0.003 && !bullMarketActive && showMarketEvents) { // 0.3% шанс каждую секунду
      setBullMarketActive(true);
      
      toast({
        title: "Бычий рынок!",
        description: "Доходность всех ваших активов увеличена на 50% на 5 минут!",
        duration: 5000
      });
      
      // Через 5 минут отключаем бычий рынок
      setTimeout(() => {
        setBullMarketActive(false);
        toast({
          title: "Бычий рынок закончился",
          description: "Доходность вернулась к нормальному уровню",
          duration: 3000
        });
      }, 300000); // 5 минут
    }
    
    // Интервал проверки обновления
    const interval = setInterval(() => {
      setLastTimestamp(Date.now());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [lastTimestamp, stakedUsdt, miningPower, marketMultiplier, setUsdt, setBtc, showMarketEvents, bullMarketActive]);
  
  // Эффект проверки достижения целей
  useEffect(() => {
    // Начальный этап: Первые 20 минут
    if (clicks >= 1 && !showResources) {
      setShowResources(true);
      toast({
        title: "Новый раздел открыт!",
        description: "Теперь вы можете отслеживать свои ресурсы.",
        duration: 3000
      });
    }
    
    if (clicks >= 3 && !showEducation) {
      setShowEducation(true);
      toast({
        title: "Новая возможность!",
        description: "Изучите основы криптовалют (требуется $10).",
        duration: 3000
      });
    }
    
    if (knowledge >= 1 && !showBuyCrypto) {
      setShowBuyCrypto(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете купить свою первую криптовалюту.",
        duration: 3000
      });
    }
    
    if (usdt >= 0.001 && !showStaking) {
      setShowStaking(true);
      toast({
        title: "Новая возможность!",
        description: "Начните зарабатывать даже когда вы не в игре с помощью стейкинга.",
        duration: 3000
      });
    }
    
    if (stakedUsdt > 0 && !showMining) {
      setShowMining(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете анализировать рынок и заняться майнингом.",
        duration: 3000
      });
    }
    
    if (dollars >= 500 && !showCareer) {
      setShowCareer(true);
      toast({
        title: "Новая возможность!",
        description: "Пора выбрать свой путь в криптомире!",
        duration: 3000
      });
    }
    
    if (dollars >= 1000 && !showMarketEvents) {
      setShowMarketEvents(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете отслеживать рыночные события и реагировать на них.",
        duration: 3000
      });
    }
    
    // Проверка достижений
    checkAchievements();
    
  }, [dollars, clicks, knowledge, usdt, stakedUsdt, showResources, showEducation, showBuyCrypto, showStaking, showMining, showCareer, showMarketEvents, setShowResources, setShowEducation, setShowBuyCrypto, setShowStaking, setShowMining, setShowCareer, setShowMarketEvents]);
  
  // Проверка достижений
  const checkAchievements = () => {
    // Достижение: Первые шаги
    if (dollars >= 100) {
      const achievementKey = 'achievement_first_steps';
      const achieved = localStorage.getItem(achievementKey);
      
      if (!achieved) {
        localStorage.setItem(achievementKey, 'true');
        setDollars(prev => prev + 50);
        toast({
          title: "Достижение разблокировано!",
          description: "Первые шаги: заработать $100. Награда: +$50!",
          duration: 5000
        });
      }
    }
    
    // Достижение: Криптоэнтузиаст
    if (knowledge >= 10) {
      const achievementKey = 'achievement_crypto_enthusiast';
      const achieved = localStorage.getItem(achievementKey);
      
      if (!achieved) {
        localStorage.setItem(achievementKey, 'true');
        setShowTrading(true);
        toast({
          title: "Достижение разблокировано!",
          description: "Криптоэнтузиаст: собрать 10 единиц знаний. Награда: Доступ к трейдингу!",
          duration: 5000
        });
      }
    }
  };
  
  // Обработчик аирдропа с горячим бонусом
  const handleAirdrop = () => {
    // 5% шанс получить горячий аирдроп
    const isHotAirdrop = Math.random() < 0.05;
    
    if (isHotAirdrop) {
      const bonus = 2; // x2 к награде
      const reward = 1 * bonus;
      
      setDollars(prev => prev + reward);
      
      toast({
        title: "Горячий аирдроп!",
        description: `Вы получили $${reward} (x${bonus} бонус)!`,
        duration: 3000
      });
      
      return reward;
    } else {
      setDollars(prev => prev + 1);
      return 1;
    }
  };
  
  // Обработчик для обучения
  const handleLearn = (cost: number, knowledgeGain: number) => {
    if (dollars >= cost) {
      setDollars(prev => prev - cost);
      setKnowledge(prev => prev + knowledgeGain);
      
      toast({
        title: "Обучение завершено!",
        description: `Вы получили +${knowledgeGain} к знаниям!`,
        duration: 3000
      });
      
      // Проверить достижения после обучения
      setTimeout(() => checkAchievements(), 500);
      
      return true;
    }
    return false;
  };
  
  return {
    handleAirdrop,
    handleLearn,
    bullMarketActive
  };
}
