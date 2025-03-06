import { useState, useEffect, useCallback, useRef } from 'react';
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
  showBuyCrypto: boolean;
  showStaking: boolean;
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

const NOTIFICATIONS_SHOWN_KEY = 'crypto_clicker_notifications_shown';

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
    showBuyCrypto,
    showStaking,
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
  
  const loadNotificationsShown = () => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_SHOWN_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Ошибка при загрузке состояния уведомлений:", e);
    }
    
    return {
      resources: false,
      education: false,
      buyCrypto: false,
      staking: false,
      trading: false,
      mining: false,
      career: false,
      marketEvents: false,
      bullMarket: false
    };
  };
  
  const [unlockNotifications, setUnlockNotifications] = useState(loadNotificationsShown());
  
  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_SHOWN_KEY, JSON.stringify(unlockNotifications));
  }, [unlockNotifications]);
  
  const handleAirdrop = useCallback(() => {
    let baseReward = 1;
    
    if (knowledge >= 5) baseReward = 1.5;
    if (knowledge >= 10) baseReward = 2;
    if (knowledge >= 20) baseReward = 3;
    if (knowledge >= 50) baseReward = 5;
    
    const rewardWithMarket = bullMarketActive ? baseReward * 1.5 : baseReward;
    
    setDollars(prev => {
      return prev + rewardWithMarket;
    });
    
    setTimeout(() => checkPurchaseMilestones(), 0);
    
    return rewardWithMarket;
  }, [knowledge, bullMarketActive, setDollars]);
  
  const checkPurchaseMilestones = useCallback(() => {
    console.log("Проверка прогресса:", {
      dollars,
      clicks,
      knowledge,
      usdt,
      stakedUsdt,
      showResources,
      showEducation,
      showBuyCrypto,
      showStaking,
      showTrading
    });
    
    if (!showResources && clicks >= 1) {
      console.log("Разблокируем ресурсы");
      setShowResources(true);
      
      if (!unlockNotifications.resources) {
        toast({
          title: "Разблокировано: Ресурсы",
          description: "Теперь вы можете видеть свои накопления вверху экрана.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, resources: true}));
      }
    }
    
    if (dollars >= 10 && !showEducation) {
      console.log("Разблокируем образование");
      setShowEducation(true);
      
      if (!unlockNotifications.education) {
        toast({
          title: "Разблокировано: Образование",
          description: "Теперь вы можете изучать основы криптовалют.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, education: true}));
      }
    }
    
    if (knowledge >= 1 && dollars >= 50 && !showBuyCrypto) {
      console.log("Разблокируем покупку криптовалют");
      setShowBuyCrypto(true);
      
      if (!unlockNotifications.buyCrypto) {
        toast({
          title: "Разблокировано: Покупка криптовалют",
          description: "Теперь вы можете купить свою первую криптовалюту.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, buyCrypto: true}));
      }
    }
    
    if (usdt >= 0.001 && dollars >= 100 && !showStaking) {
      console.log("Разблокируем стейкинг");
      setShowStaking(true);
      
      if (!unlockNotifications.staking) {
        toast({
          title: "Разблокировано: Стейкинг",
          description: "Теперь вы можете зарабатывать пассивный доход.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, staking: true}));
      }
    }
    
    if (stakedUsdt > 0 && !showTrading) {
      console.log("Разблокируем трейдинг");
      setShowTrading(true);
      
      if (!unlockNotifications.trading) {
        toast({
          title: "Разблокировано: Трейдинг",
          description: "Теперь вы можете торговать криптовалютами.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, trading: true}));
      }
    }
    
    if (knowledge >= 15 && !showMining) {
      console.log("Разблокируем майнинг");
      setShowMining(true);
      
      if (!unlockNotifications.mining) {
        toast({
          title: "Разблокировано: Майнинг",
          description: "Теперь вы можете добывать криптовалюту с помощью оборудования.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, mining: true}));
      }
    }
    
    if (dollars >= 500 && !showCareer) {
      console.log("Разблокируем карьеру");
      setShowCareer(true);
      
      if (!unlockNotifications.career) {
        toast({
          title: "Разблокировано: Карьера",
          description: "Теперь вы можете выбрать специализацию в криптомире.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, career: true}));
      }
    }
    
    if (knowledge >= 30 && !showMarketEvents) {
      console.log("Разблокируем события рынка");
      setShowMarketEvents(true);
      
      if (!unlockNotifications.marketEvents) {
        toast({
          title: "Разблокировано: События рынка",
          description: "Теперь вы можете отслеживать и реагировать на события рынка.",
          duration: 5000
        });
        setUnlockNotifications(prev => ({...prev, marketEvents: true}));
      }
    }
  }, [dollars, knowledge, usdt, stakedUsdt, clicks, showResources, showEducation, showBuyCrypto, showStaking, showTrading, showMining, showCareer, showMarketEvents, setShowResources, setShowBuyCrypto, setShowStaking, setShowTrading, setShowEducation, setShowMining, setShowCareer, setShowMarketEvents, unlockNotifications]);
  
  useEffect(() => {
    checkPurchaseMilestones();
  }, [dollars, knowledge, usdt, stakedUsdt, clicks, checkPurchaseMilestones]);
  
  const handleLearn = useCallback((cost: number, knowledgeGain: number) => {
    console.log(`Попытка обучения: стоимость $${cost}, прирост знаний +${knowledgeGain}`);
    if (dollars >= cost) {
      setDollars(prev => prev - cost);
      setKnowledge(prev => prev + knowledgeGain);
      
      toast({
        title: "Знания получены!",
        description: `Вы получили +${knowledgeGain} к знаниям о криптовалютах.`,
        duration: 3000
      });
      
      setTimeout(() => checkPurchaseMilestones(), 0);
      
      return true;
    } else {
      console.log("Недостаточно средств для обучения");
      toast({
        title: "Недостаточно средств",
        description: `Для обучения нужно $${cost}`,
        duration: 3000
      });
      
      return false;
    }
  }, [dollars, setDollars, setKnowledge, checkPurchaseMilestones]);
  
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
  
  useEffect(() => {
    if (miningPower > 0) {
      console.log(`Mining effect activated with power: ${miningPower}, market multiplier: ${marketMultiplier}`);
      
      const interval = setInterval(() => {
        const baseMining = miningPower * 0.0001; // 0.0001 BTC в час для каждой единицы мощности
        const marketModifier = marketMultiplier;
        const btcEarned = baseMining * marketModifier;
        
        console.log(`Mining tick: +${btcEarned.toFixed(8)} BTC earned`);
        setBtc(prev => prev + btcEarned);
      }, 300000); // Каждые 5 минут (переведено из часа)
      
      return () => {
        console.log("Mining effect cleanup");
        clearInterval(interval);
      };
    }
  }, [miningPower, marketMultiplier, setBtc]);
  
  useEffect(() => {
    const eventInterval = setInterval(() => {
      if (Math.random() < 0.05 && showMarketEvents) {
        setBullMarketActive(true);
        
        if (!unlockNotifications.bullMarket) {
          toast({
            title: "Бычий рынок!",
            description: "Рынок идет вверх! +50% к доходности на следующие 5 минут.",
            duration: 5000
          });
          setUnlockNotifications(prev => ({...prev, bullMarket: true}));
        }
        
        setTimeout(() => {
          setBullMarketActive(false);
        }, 300000); // 5 минут
      }
    }, 300000); // Проверка каждые 5 минут
    
    return () => clearInterval(eventInterval);
  }, [showMarketEvents, unlockNotifications]);
  
  return {
    handleAirdrop,
    handleLearn,
    bullMarketActive
  };
};
