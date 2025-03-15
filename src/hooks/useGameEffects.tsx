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
  showBuyUsdt: boolean;
  showStaking: boolean;
  setShowResources: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBuyCrypto: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBuyUsdt: React.Dispatch<React.SetStateAction<boolean>>;
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
  setStakedUsdt: React.Dispatch<React.SetStateAction<number>>;
}

const NOTIFICATIONS_SHOWN_KEY = 'crypto_clicker_notifications_shown';
const STAKING_PROGRESS_KEY = 'crypto_clicker_staking_progress';

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
    showBuyUsdt,
    showStaking,
    setShowResources, 
    setShowBuyCrypto, 
    setShowBuyUsdt,
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
    setDollars,
    setStakedUsdt 
  } = props;
  
  const [bullMarketActive, setBullMarketActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintInfo, setHintInfo] = useState({ title: '', description: '' });
  const lastStakingUpdateRef = useRef<number>(Date.now());
  
  useEffect(() => {
    try {
      const stakingProgressStr = localStorage.getItem(STAKING_PROGRESS_KEY);
      if (stakingProgressStr) {
        const stakingProgress = JSON.parse(stakingProgressStr);
        
        if (stakingProgress && stakingProgress.stakedUsdt > 0 && stakingProgress.lastUpdate) {
          const now = Date.now();
          const lastUpdate = stakingProgress.lastUpdate;
          const elapsedMinutes = (now - lastUpdate) / (1000 * 60);
          
          if (elapsedMinutes > 0) {
            const yearlyRatePercent = 10;
            const yearlyRate = yearlyRatePercent / 100;
            const minuteRate = yearlyRate / (365 * 24 * 60);
            
            const income = stakingProgress.stakedUsdt * minuteRate * elapsedMinutes;
            
            if (income > 0) {
              setUsdt(prev => prev + income);
              lastStakingUpdateRef.current = now;
              saveStakingProgress(stakingProgress.stakedUsdt);
            }
          }
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке прогресса стейкинга:", error);
    }
  }, []);
  
  const saveStakingProgress = (currentStakedUsdt: number) => {
    try {
      const stakingProgress = {
        stakedUsdt: currentStakedUsdt,
        lastUpdate: Date.now()
      };
      localStorage.setItem(STAKING_PROGRESS_KEY, JSON.stringify(stakingProgress));
    } catch (error) {
      console.error("Ошибка при сохранении прогресса стейкинга:", error);
    }
  };
  
  useEffect(() => {
    if (stakedUsdt > 0) {
      saveStakingProgress(stakedUsdt);
    }
  }, [stakedUsdt]);
  
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
      buyUsdt: false,
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
  
  const showFeatureHint = (title: string, description: string, feature: string) => {
    if (!unlockNotifications[feature as keyof typeof unlockNotifications]) {
      setHintInfo({ title, description });
      setShowHint(true);
    }
  };
  
  const closeHint = (feature: string) => {
    setShowHint(false);
    setUnlockNotifications(prev => ({...prev, [feature]: true}));
  };
  
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
      showBuyUsdt,
      showStaking,
      showTrading
    });
    
    if (!showResources && clicks >= 1) {
      console.log("Разблокируем ресурсы");
      setShowResources(true);
      
      showFeatureHint(
        "Разблокировано: Ресурсы", 
        "Теперь вы можете видеть свои накопления вверху экрана.", 
        "resources"
      );
    }
    
    if (dollars >= 10 && !showEducation) {
      console.log("Разблокируем образование");
      setShowEducation(true);
      
      showFeatureHint(
        "Разблокировано: Образование", 
        "Теперь вы можете изучать основы криптовалют.", 
        "education"
      );
    }
    
    if (knowledge >= 1 && !showBuyUsdt) {
      console.log("Разблокируем покупку USDT");
      setShowBuyUsdt(true);
      
      showFeatureHint(
        "Разблокировано: Покупка USDT", 
        "Теперь вы можете покупать стейблкоины для дальнейших инвестиций.", 
        "buyUsdt"
      );
    }
    
    if (knowledge >= 1 && dollars >= 50 && !showBuyCrypto) {
      console.log("Разблокируем покупку криптовалют");
      setShowBuyCrypto(true);
      
      showFeatureHint(
        "Разблокировано: Покупка криптовалют", 
        "Теперь вы можете купить свою первую криптовалюту.", 
        "buyCrypto"
      );
    }
    
    if (usdt >= 10 && !showStaking) {
      console.log("Разблокируем стейкинг");
      setShowStaking(true);
      
      showFeatureHint(
        "Разблокировано: Стейкинг", 
        "Теперь вы можете зарабатывать пассивный доход, отправляя USDT в стейкинг.", 
        "staking"
      );
    }
    
    if (stakedUsdt > 0 && !showTrading) {
      console.log("Разблокируем трейдинг");
      setShowTrading(true);
      
      showFeatureHint(
        "Разблокировано: Трейдинг", 
        "Теперь вы можете торговать криптовалютами.", 
        "trading"
      );
    }
    
    if (knowledge >= 15 && !showMining) {
      console.log("Разблокируем майнинг");
      setShowMining(true);
      
      showFeatureHint(
        "Разблокировано: Майнинг", 
        "Теперь вы можете добывать криптовалюту с помощью оборудования.", 
        "mining"
      );
    }
    
    if (dollars >= 500 && !showCareer) {
      console.log("Разблокируем карьеру");
      setShowCareer(true);
      
      showFeatureHint(
        "Разблокировано: Карьера", 
        "Теперь вы можете выбрать специализацию в криптомире.", 
        "career"
      );
    }
    
    if (knowledge >= 30 && !showMarketEvents) {
      console.log("Разблокируем события рынка");
      setShowMarketEvents(true);
      
      showFeatureHint(
        "Разблокировано: События рынка", 
        "Теперь вы можете отслеживать и реагировать на события рынка.", 
        "marketEvents"
      );
    }
  }, [
    dollars, knowledge, usdt, stakedUsdt, clicks, 
    showResources, showEducation, showBuyCrypto, showBuyUsdt, 
    showStaking, showTrading, showMining, showCareer, showMarketEvents, 
    setShowResources, setShowBuyCrypto, setShowBuyUsdt, setShowStaking, 
    setShowTrading, setShowEducation, setShowMining, setShowCareer, 
    setShowMarketEvents, unlockNotifications
  ]);
  
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
  
  const handleBuyUsdt = useCallback((amount: number) => {
    console.log(`Попытка покупки USDT за $${amount}`);
    if (dollars >= amount) {
      let fee = 5;
      if (knowledge >= 5) fee = 4;
      if (knowledge >= 10) fee = 3;
      if (knowledge >= 20) fee = 2;
      if (knowledge >= 50) fee = 1;
      
      const usdtAmount = amount * (1 - fee/100);
      
      setDollars(prev => prev - amount);
      setUsdt(prev => prev + usdtAmount);
      
      console.log(`Куплено ${usdtAmount.toFixed(2)} USDT за $${amount} с комиссией ${fee}%`);
      
      setTimeout(() => checkPurchaseMilestones(), 0);
      
      return true;
    } else {
      console.log("Недостаточно средств для покупки USDT");
      toast({
        title: "Недостаточно средств",
        description: `Для покупки нужно $${amount}`,
        duration: 3000
      });
      
      return false;
    }
  }, [dollars, knowledge, setDollars, setUsdt, checkPurchaseMilestones]);
  
  const handleStake = useCallback((amount: number) => {
    console.log(`Попытка стейкинга ${amount} USDT`);
    if (usdt >= amount) {
      setUsdt(prev => prev - amount);
      setStakedUsdt(prev => prev + amount);
      
      console.log(`Отправлено ${amount} USDT в стейкинг`);
      saveStakingProgress(stakedUsdt + amount);
      
      setTimeout(() => checkPurchaseMilestones(), 0);
      
      return true;
    } else {
      console.log("Недостаточно USDT для стейкинга");
      toast({
        title: "Недостаточно USDT",
        description: `Для стейкинга нужно ${amount} USDT`,
        duration: 3000
      });
      
      return false;
    }
  }, [usdt, stakedUsdt, setUsdt, setStakedUsdt, checkPurchaseMilestones]);
  
  const handleWithdraw = useCallback((amount: number) => {
    console.log(`Попытка вывода ${amount} USDT из стейкинга`);
    if (stakedUsdt >= amount) {
      setStakedUsdt(prev => {
        const newValue = prev - amount;
        saveStakingProgress(newValue);
        return newValue;
      });
      setUsdt(prev => prev + amount);
      
      console.log(`Выведено ${amount} USDT из стейкинга`);
      
      return true;
    } else {
      console.log("Недостаточно USDT в стейкинге");
      toast({
        title: "Недостаточно средств в стейкинге",
        description: `В стейкинге только ${stakedUsdt} USDT`,
        duration: 3000
      });
      
      return false;
    }
  }, [stakedUsdt, setStakedUsdt, setUsdt]);
  
  useEffect(() => {
    if (stakedUsdt > 0) {
      const interval = setInterval(() => {
        const baseIncome = stakedUsdt * 0.01;
        const marketBonus = bullMarketActive ? 1.5 : 1;
        const income = baseIncome * marketBonus;
        
        setUsdt(prev => prev + income);
        console.log(`Доход от стейкинга: +${income.toFixed(4)} USDT (бонус рынка: ${marketBonus}x)`);
        
        lastStakingUpdateRef.current = Date.now();
        saveStakingProgress(stakedUsdt);
      }, 60000);
      
      return () => clearInterval(interval);
    }
  }, [stakedUsdt, bullMarketActive, setUsdt]);
  
  useEffect(() => {
    if (miningPower > 0) {
      console.log(`Mining effect activated with power: ${miningPower}, market multiplier: ${marketMultiplier}`);
      
      const interval = setInterval(() => {
        const baseMining = miningPower * 0.0001;
        const marketModifier = marketMultiplier;
        const btcEarned = baseMining * marketModifier;
        
        console.log(`Mining tick: +${btcEarned.toFixed(8)} BTC earned`);
        setBtc(prev => prev + btcEarned);
      }, 300000);
      
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
        
        showFeatureHint(
          "Бычий рынок!",
          "Рынок идет вверх! +50% к доходности на следующие 5 минут.",
          "bullMarket"
        );
        
        setTimeout(() => {
          setBullMarketActive(false);
        }, 300000);
      }
    }, 300000);
    
    return () => clearInterval(eventInterval);
  }, [showMarketEvents]);
  
  return {
    handleAirdrop,
    handleLearn,
    handleBuyUsdt,
    handleStake,
    handleWithdraw,
    bullMarketActive,
    showHint,
    hintInfo,
    closeHint
  };
};
