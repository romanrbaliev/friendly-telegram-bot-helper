import React, { useState, useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import ResourceDisplay from './ResourceDisplay';
import GameTabs from './GameTabs';
import MainActions from './MainActions';
import GameHeader from './GameHeader';
import StakingTab from './StakingTab';
import HintPopup from './HintPopup';
import MobileGameLayout from './MobileGameLayout';
import { useGameState } from '@/hooks/useGameState';
import { useSaveGame } from '@/hooks/useSaveGame';
import { useGameEffects } from '@/hooks/useGameEffects';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const GameContainer: React.FC = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [currentFeature, setCurrentFeature] = useState('');
  const isMobile = useIsMobile();
  
  const gameState = useGameState();
  
  const {
    dollars, setDollars,
    usdt, setUsdt,
    btc, setBtc,
    stakedUsdt, setStakedUsdt,
    knowledge, setKnowledge,
    miningPower, setMiningPower,
    role, setRole,
    marketMultiplier, setMarketMultiplier,
    showResources, setShowResources,
    showBuyCrypto, setShowBuyCrypto,
    showBuyUsdt, setShowBuyUsdt,
    showStaking, setShowStaking,
    showTrading, setShowTrading,
    showEducation, setShowEducation,
    showMining, setShowMining, 
    showCareer, setShowCareer,
    showMarketEvents, setShowMarketEvents,
    clicks, setClicks,
    activeTab, setActiveTab,
    getFullState
  } = gameState;
  
  useSaveGame({
    gameState: getFullState(),
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
    setShowBuyUsdt,
    setShowStaking,
    setShowTrading,
    setShowEducation,
    setShowMining,
    setShowCareer,
    setShowMarketEvents,
    setClicks
  });
  
  const { 
    handleAirdrop, 
    handleLearn, 
    handleBuyUsdt, 
    handleStake, 
    handleWithdraw, 
    bullMarketActive,
    showHint,
    hintInfo,
    closeHint
  } = useGameEffects({
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
  });
  
  useEffect(() => {
    if (showHint) {
      if (hintInfo.title.includes("Ресурсы")) {
        setCurrentFeature("resources");
      } else if (hintInfo.title.includes("Образование")) {
        setCurrentFeature("education");
      } else if (hintInfo.title.includes("Покупка криптовалют")) {
        setCurrentFeature("buyCrypto");
      } else if (hintInfo.title.includes("Покупка USDT")) {
        setCurrentFeature("buyUsdt");
      } else if (hintInfo.title.includes("Стейкинг")) {
        setCurrentFeature("staking");
      } else if (hintInfo.title.includes("Трейдинг")) {
        setCurrentFeature("trading");
      } else if (hintInfo.title.includes("Майнинг")) {
        setCurrentFeature("mining");
      } else if (hintInfo.title.includes("Карьера")) {
        setCurrentFeature("career");
      } else if (hintInfo.title.includes("События рынка")) {
        setCurrentFeature("marketEvents");
      } else if (hintInfo.title.includes("Бычий рынок")) {
        setCurrentFeature("bullMarket");
      }
    }
  }, [showHint, hintInfo]);
  
  const handleCloseHint = (feature: string) => {
    closeHint(feature);
  };
  
  const handleSaveDollar = () => {
    console.log("handleSaveDollar вызван");
    const reward = handleAirdrop();
    setClicks(prev => prev + 1);
    console.log(`Получено: $${reward}, новый баланс: $${dollars + reward}`);
  };
  
  const handleBuyCrypto = () => {
    console.log("handleBuyCrypto вызван, текущий баланс: $", dollars);
    if (dollars >= 50) {
      setDollars(prev => {
        console.log(`Баланс до покупки: $${prev}`);
        return prev - 50;
      });
      setBtc(prev => prev + 0.001);
      
      toast({
        title: "Покупка криптовалюты",
        description: "Вы купили свою первую криптовалюту: 0.001 BTC!",
        duration: 3000
      });
      console.log("Криптовалюта успешно куплена");
    } else {
      console.log("Недостаточно средств для покупки криптовалюты");
      toast({
        title: "Недостаточно средств",
        description: "Нужно $50 для покупки криптовалюты",
        duration: 3000
      });
    }
  };
  
  const handleLearnBasics = () => {
    console.log("handleLearnBasics вызван, текущий баланс: $", dollars);
    if (dollars >= 10) {
      setDollars(prev => {
        console.log(`Баланс до обучения: $${prev}`);
        return prev - 10;
      });
      setKnowledge(prev => prev + 1);
      
      toast({
        title: "Знания получены!",
        description: "Вы изучили основы криптовалют.",
        duration: 3000
      });
      console.log("Обучение успешно завершено");
    } else {
      console.log("Недостаточно средств для обучения");
      toast({
        title: "Недостаточно средств",
        description: "Нужно $10 для обучения",
        duration: 3000
      });
    }
  };
  
  const handleTrade = (fromUSDT: boolean, amount: number) => {
    if (fromUSDT) {
      setUsdt(prev => prev - amount);
      setBtc(prev => prev + amount * 0.00002 * (role === 'trader' ? 1.05 : 1));
    } else {
      setBtc(prev => prev - amount);
      const fee = 5 - (knowledge / 20) - (role === 'trader' ? 1 : 0);
      const commissionRate = Math.max(fee, 0.5) / 100;
      setUsdt(prev => prev + amount * 50000 * (1 - commissionRate));
    }
  };

  const handleLearnMarket = (cost: number, knowledgeGain: number) => {
    return handleLearn(cost, knowledgeGain);
  };
  
  const handlePurchaseRig = (cost: number, powerIncrease: number = 0) => {
    if (dollars >= cost) {
      setDollars(prev => prev - cost);
      
      if (powerIncrease > 0) {
        setMiningPower(prev => prev + powerIncrease);
        
        toast({
          title: "Оборудование куплено!",
          description: `Мощность майнинга увеличена на ${powerIncrease}.`,
          duration: 3000
        });
      }
    }
  };

  const handleSelectRole = (selectedRole: string) => {
    if (dollars >= 500) {
      setDollars(prev => prev - 500);
      setRole(selectedRole);
      
      let bonusMessage = "";
      
      if (selectedRole === 'investor') {
        bonusMessage = "Бонус: +10% к доходности стейкинга";
      } else if (selectedRole === 'trader') {
        bonusMessage = "Бонус: +5% к успешности сделок";
      }
      
      toast({
        title: `Вы выбрали путь: ${selectedRole === 'investor' ? 'Инвестор' : 'Трейдер'}`,
        description: bonusMessage,
        duration: 5000
      });
    }
  };

  const handleMarketChange = (multiplier: number) => {
    setMarketMultiplier(multiplier);
  };
  
  const handlePrepareForEvent = (cost: number) => {
    if (dollars >= cost) {
      setDollars(prev => prev - cost);
      
      toast({
        title: "Подготовка к событию",
        description: "Вы успешно подготовились к событию на рынке!",
        duration: 3000
      });
    }
  };
  
  const handleStakingWrapper = () => {
    handleStake(10);
  };

  const handleBuyUsdtWrapper = () => {
    if (dollars >= 10) {
      handleBuyUsdt(10);
    } else {
      console.log("Недостаточно средств для покупки USDT");
      toast({
        title: "Недостаточно средств",
        description: "Нужно $10 для покупки USDT",
        duration: 3000
      });
    }
  };

  const showTabsCondition = showTrading || showEducation || showMining || showCareer || showMarketEvents || showStaking;

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-0 flex flex-col">
      <WelcomePopup 
        open={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)} 
      />
      
      {showHint && (
        <HintPopup
          title={hintInfo.title}
          description={hintInfo.description}
          isOpen={showHint}
          onClose={() => handleCloseHint(currentFeature)}
        />
      )}
      
      <GameHeader bullMarketActive={bullMarketActive} />
      
      {isMobile ? (
        <MobileGameLayout
          showResources={showResources}
          showTabs={showTabsCondition}
          dollars={dollars}
          usdt={usdt}
          btc={btc}
          stakedUsdt={stakedUsdt}
          knowledge={knowledge}
          showBuyCrypto={showBuyCrypto}
          showBuyUsdt={showBuyUsdt}
          showStaking={showStaking}
          showEducation={showEducation}
          showTrading={showTrading}
          showMining={showMining} 
          showCareer={showCareer}
          showMarketEvents={showMarketEvents}
          miningPower={miningPower}
          marketMultiplier={marketMultiplier}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          role={role}
          clicks={clicks}
          handleSaveDollar={handleSaveDollar}
          handleBuyCrypto={handleBuyCrypto}
          handleStakingWrapper={handleStakingWrapper}
          handleTrade={handleTrade}
          handleLearnMarket={handleLearnMarket}
          handlePurchaseRig={handlePurchaseRig}
          handleSelectRole={handleSelectRole}
          handleMarketChange={handleMarketChange}
          handlePrepareForEvent={handlePrepareForEvent}
          handleLearnBasics={handleLearnBasics}
          handleBuyUsdtWrapper={handleBuyUsdtWrapper}
          handleStake={handleStake}
          handleWithdraw={handleWithdraw}
          showHint={showHint}
          hintInfo={hintInfo}
          handleCloseHint={handleCloseHint}
          currentFeature={currentFeature}
        />
      ) : (
        <>


