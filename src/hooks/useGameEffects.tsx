
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

interface GameEffectsProps {
  dollars: number;
  usdt: number;
  stakedUsdt: number;
  miningPower: number;
  setUsdt: React.Dispatch<React.SetStateAction<number>>;
  setBtc: React.Dispatch<React.SetStateAction<number>>;
  showResources: boolean;
  showTrading: boolean;
  showEducation: boolean;
  showMining: boolean;
  showCareer: boolean;
  showMarketEvents: boolean;
  setShowResources: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBuyCrypto: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStaking: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTrading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEducation: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMining: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCareer: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMarketEvents: React.Dispatch<React.SetStateAction<boolean>>;
  clicks: number;
  marketMultiplier: number;
  knowledge: number;
  setKnowledge: React.Dispatch<React.SetStateAction<number>>;
  setDollars: React.Dispatch<React.SetStateAction<number>>;
}

export const useGameEffects = (props: GameEffectsProps) => {
  const { 
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
    setShowResources, 
    setShowBuyCrypto, 
    setShowStaking, 
    setShowTrading, 
    setShowEducation, 
    setShowMining, 
    setShowCareer, 
    setShowMarketEvents, 
    clicks, 
    marketMultiplier, 
    knowledge, 
    setKnowledge, 
    setDollars 
  } = props;
  
  const [bullMarketActive, setBullMarketActive] = useState(false);
  
  // Механика аирдропа - получение бесплатных криптовалют
  const handleAirdrop = useCallback(() => {
    // Базовая награда за клик
    let baseReward = 1;
    
    // Увеличение награды в зависимости от уровня знаний
    if (knowledge >= 5) baseReward = 1.5;
    if (knowledge >= 10) baseReward = 2;
    if (knowledge >= 20) baseReward = 3;
    if (knowledge >= 50) baseReward = 5;
    
    // Применение бонуса бычьего рынка
    const rewardWithMarket = bullMarketActive ? baseReward * 1.5 : baseReward;
    
    setDollars(prev => prev + rewardWithMarket);
    checkPurchaseMilestones();
    
    return rewardWithMarket;
  }, [knowledge, bullMarketActive, setDollars]);
  
  // Проверка и разблокировка новых функций
  const checkPurchaseMilestones = useCallback(() => {
    if (!showResources && clicks >= 1) {
      setShowResources(true);
      
      toast({
        title: "Разблокировано: Ресурсы",
        description: "Теперь вы можете видеть свои накопления вверху экрана.",
        duration: 5000
      });
    }
    
    if (dollars >= 10 && !showEducation) {
      setShowEducation(true);
      
      toast({
        title: "Разблокировано: Образование",
        description: "Теперь вы можете изучать основы криптовалют.",
        duration: 5000
      });
    }
    
    if (knowledge >= 1 && dollars >= 50 && !setShowBuyCrypto) {
      setShowBuyCrypto(true);
      
      toast({
        title: "Разблокировано: Покупка криптовалют",
        description: "Теперь вы можете купить свою первую криптовалюту.",
        duration: 5000
      });
    }
    
    if (usdt >= 0.001 && dollars >= 100 && !setShowStaking) {
      setShowStaking(true);
      
      toast({
        title: "Разблокировано: Стейкинг",
        description: "Теперь вы можете зарабатывать пассивный доход.",
        duration: 5000
      });
    }
    
    if (stakedUsdt > 0 && !showTrading) {
      setShowTrading(true);
      
      toast({
        title: "Разблокировано: Трейдинг",
        description: "Теперь вы можете торговать криптовалютами.",
        duration: 5000
      });
    }
    
    if (knowledge >= 15 && !showMining) {
      setShowMining(true);
      
      toast({
        title: "Разблокировано: Майнинг",
        description: "Теперь вы можете добывать криптовалюту с помощью оборудования.",
        duration: 5000
      });
    }
    
    if (dollars >= 500 && !showCareer) {
      setShowCareer(true);
      
      toast({
        title: "Разблокировано: Карьера",
        description: "Теперь вы можете выбрать специализацию в криптомире.",
        duration: 5000
      });
    }
    
    if (knowledge >= 30 && !showMarketEvents) {
      setShowMarketEvents(true);
      
      toast({
        title: "Разблокировано: События рынка",
        description: "Теперь вы можете отслеживать и реагировать на события рынка.",
        duration: 5000
      });
    }
  }, [dollars, knowledge, usdt, stakedUsdt, clicks, showResources, showEducation, showTrading, showMining, showCareer, showMarketEvents, setShowResources, setShowBuyCrypto, setShowStaking, setShowTrading, setShowEducation, setShowMining, setShowCareer, setShowMarketEvents]);
  
  // Механика обучения - получение знаний
  const handleLearn = useCallback((cost: number, knowledgeGain: number) => {
    if (dollars >= cost) {
      setDollars(prev => prev - cost);
      setKnowledge(prev => prev + knowledgeGain);
      checkPurchaseMilestones();
      
      toast({
        title: "Знания получены!",
        description: `Вы получили +${knowledgeGain} к знаниям о криптовалютах.`,
        duration: 3000
      });
      
      return true;
    }
    
    return false;
  }, [dollars, setDollars, setKnowledge, checkPurchaseMilestones]);
  
  // Функция пассивного дохода от стейкинга
  useEffect(() => {
    if (stakedUsdt > 0) {
      const interval = setInterval(() => {
        const baseIncome = stakedUsdt * 0.01; // 1% в минуту
        const marketBonus = bullMarketActive ? 1.5 : 1;
        setUsdt(prev => prev + baseIncome * marketBonus);
      }, 60000); // Каждую минуту
      
      return () => clearInterval(interval);
    }
  }, [stakedUsdt, bullMarketActive, setUsdt]);
  
  // Функция майнинга (если есть мощность)
  useEffect(() => {
    if (miningPower > 0) {
      const interval = setInterval(() => {
        // Базовый доход от майнинга
        const baseMining = miningPower * 0.0001; // 0.0001 BTC в час для каждой единицы мощности
        const marketModifier = marketMultiplier;
        setBtc(prev => prev + baseMining * marketModifier);
      }, 3600000 / 12); // Каждые 5 минут (1/12 часа)
      
      return () => clearInterval(interval);
    }
  }, [miningPower, marketMultiplier, setBtc]);
  
  // Функция рыночных событий
  useEffect(() => {
    const eventInterval = setInterval(() => {
      // 5% шанс активации бычьего рынка каждые 5 минут
      if (Math.random() < 0.05 && showMarketEvents) {
        setBullMarketActive(true);
        
        toast({
          title: "Бычий рынок!",
          description: "Рынок идет вверх! +50% к доходности на следующие 5 минут.",
          duration: 5000
        });
        
        // Деактивация через 5 минут
        setTimeout(() => {
          setBullMarketActive(false);
          
          toast({
            title: "Бычий рынок закончился",
            description: "Рынок вернулся к обычным значениям.",
            duration: 3000
          });
        }, 300000); // 5 минут
      }
    }, 300000); // Проверка каждые 5 минут
    
    return () => clearInterval(eventInterval);
  }, [showMarketEvents]);
  
  return {
    handleAirdrop,
    handleLearn,
    bullMarketActive
  };
};
