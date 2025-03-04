
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
  marketMultiplier
}: UseGameEffectsProps) {
  
  // Эффект стейкинга
  useEffect(() => {
    let stakingInterval: NodeJS.Timeout | null = null;
    
    if (stakedUsdt > 0) {
      stakingInterval = setInterval(() => {
        const reward = stakedUsdt * 0.001;
        setUsdt(prev => prev + reward);
      }, 10000);
    }
    
    return () => {
      if (stakingInterval) clearInterval(stakingInterval);
    };
  }, [stakedUsdt, setUsdt]);
  
  // Эффект майнинга
  useEffect(() => {
    let miningInterval: NodeJS.Timeout | null = null;
    
    if (miningPower > 0) {
      miningInterval = setInterval(() => {
        const mined = miningPower * 0.00001 * marketMultiplier;
        setBtc(prev => prev + mined);
      }, 10000);
    }
    
    return () => {
      if (miningInterval) clearInterval(miningInterval);
    };
  }, [miningPower, setBtc, marketMultiplier]);
  
  // Эффект проверки достижения целей
  useEffect(() => {
    if (dollars >= 100 && !showTrading) {
      setShowTrading(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете торговать на бирже.",
        duration: 3000
      });
    }

    if (dollars >= 200 && !showEducation) {
      setShowEducation(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете получать криптообразование.",
        duration: 3000
      });
    }
    
    if (dollars >= 500 && !showMining) {
      setShowMining(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете заниматься майнингом криптовалют.",
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
  }, [dollars, showTrading, showEducation, showMining, showMarketEvents, setShowTrading, setShowEducation, setShowMining, setShowMarketEvents]);
  
  // Эффекты открытия функций
  const handleInitialClicks = () => {
    if (!showResources) {
      setShowResources(true);
      toast({
        title: "Новый раздел открыт!",
        description: "Теперь вы можете отслеживать свои ресурсы.",
        duration: 3000
      });
    }
    
    if (clicks === 4) {
      setShowBuyCrypto(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете покупать криптовалюту.",
        duration: 3000
      });
    }
  };
  
  const checkPurchaseMilestones = (purchaseAmount: number) => {
    if (purchaseAmount >= 50 && usdt >= 50) {
      setShowStaking(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете использовать стейкинг криптовалюты для пассивного дохода.",
        duration: 3000
      });
    }
  };
  
  return {
    handleInitialClicks,
    checkPurchaseMilestones
  };
}
