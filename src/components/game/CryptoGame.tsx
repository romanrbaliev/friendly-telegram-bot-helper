
import React, { useState } from 'react';
import WelcomePopup from './WelcomePopup';
import ResourceDisplay from './ResourceDisplay';
import GameProgress from './GameProgress';
import GameTabs from './GameTabs';
import MainActions from './MainActions';
import { toast } from '@/components/ui/use-toast';
import { useGameEffects } from '@/hooks/useGameEffects';

const CryptoGame: React.FC = () => {
  // Основные ресурсы
  const [dollars, setDollars] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [btc, setBtc] = useState(0);
  const [stakedUsdt, setStakedUsdt] = useState(0);
  const [knowledge, setKnowledge] = useState(0);
  const [miningPower, setMiningPower] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [marketMultiplier, setMarketMultiplier] = useState(1);
  
  // Флаги открытия функций
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showResources, setShowResources] = useState(false);
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const [showStaking, setShowStaking] = useState(false);
  const [showTrading, setShowTrading] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showMining, setShowMining] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showMarketEvents, setShowMarketEvents] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [activeTab, setActiveTab] = useState('main');
  
  // Используем хук игровых эффектов
  const { handleInitialClicks, checkPurchaseMilestones } = useGameEffects({
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
  });
  
  // Обработчики действий
  const handleSaveDollar = () => {
    setDollars(prev => prev + 1);
    setClicks(prev => prev + 1);
    handleInitialClicks();
  };
  
  const handleBuyCrypto = () => {
    if (dollars >= 10) {
      const purchaseAmount = dollars;
      const fee = purchaseAmount * 0.05;
      const finalAmount = purchaseAmount - fee;
      
      setDollars(0);
      setUsdt(prev => prev + finalAmount);
      
      toast({
        title: "Покупка криптовалюты",
        description: `Вы купили ${finalAmount.toFixed(2)} USDT. Комиссия составила ${fee.toFixed(2)}$.`,
        duration: 3000
      });
      
      checkPurchaseMilestones(purchaseAmount);
    }
  };
  
  const handleStaking = () => {
    if (usdt >= 10) {
      setUsdt(prev => prev - 10);
      setStakedUsdt(prev => prev + 10);
      
      toast({
        title: "Стейкинг активирован",
        description: "Вы разместили 10 USDT в стейкинге. Теперь вы будете получать пассивный доход.",
        duration: 3000
      });
    }
  };
  
  const handleTrade = (fromUSDT: boolean, amount: number) => {
    if (fromUSDT) {
      setUsdt(prev => prev - amount);
      setBtc(prev => prev + amount * 0.00002);
    } else {
      setBtc(prev => prev - amount);
      const fee = 5 - (knowledge / 20);
      const commissionRate = Math.max(fee, 0.5) / 100;
      setUsdt(prev => prev + amount * 50000 * (1 - commissionRate));
    }
  };

  const handleLearn = (cost: number, knowledgeGain: number) => {
    setDollars(prev => prev - cost);
    setKnowledge(prev => Math.min(prev + knowledgeGain, 100));
  };
  
  const handlePurchaseRig = (cost: number) => {
    setDollars(prev => prev - cost);
    setMiningPower(prev => prev + 1);
  };

  const handleSelectRole = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleMarketChange = (multiplier: number) => {
    setMarketMultiplier(multiplier);
  };
  
  const handlePrepareForEvent = (cost: number) => {
    setDollars(prev => prev - cost);
  };

  // Проверяем, нужно ли показывать табы
  const showTabs = showTrading || showEducation || showMining || showCareer || showMarketEvents;

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-4 flex flex-col">
      <WelcomePopup 
        open={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)} 
      />
      
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gradient">Crypto Clicker</h1>
        <p className="text-sm text-gray-400">Путь от нуля до миллиона</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          {showResources && (
            <ResourceDisplay 
              dollars={dollars} 
              usdt={usdt} 
              showUsdt={usdt > 0 || showBuyCrypto}
              stakedUsdt={stakedUsdt}
              showStaking={showStaking || stakedUsdt > 0}
              knowledge={knowledge}
              showKnowledge={showEducation}
              btc={btc}
              showBtc={btc > 0 || showTrading}
              role={role}
            />
          )}
          
          {showTabs ? (
            <GameTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showTrading={showTrading}
              showEducation={showEducation}
              showMining={showMining}
              showCareer={showCareer}
              showMarketEvents={showMarketEvents}
              dollars={dollars}
              usdt={usdt}
              btc={btc}
              knowledge={knowledge}
              marketMultiplier={marketMultiplier}
              handleSaveDollar={handleSaveDollar}
              handleBuyCrypto={handleBuyCrypto}
              handleStaking={handleStaking}
              handleTrade={handleTrade}
              handleLearn={handleLearn}
              handlePurchaseRig={handlePurchaseRig}
              handleSelectRole={handleSelectRole}
              handleMarketChange={handleMarketChange}
              handlePrepareForEvent={handlePrepareForEvent}
              showBuyCrypto={showBuyCrypto}
              showStaking={showStaking}
              role={role}
            />
          ) : (
            <MainActions 
              dollars={dollars}
              usdt={usdt}
              handleSaveDollar={handleSaveDollar}
              handleBuyCrypto={handleBuyCrypto}
              handleStaking={handleStaking}
              showBuyCrypto={showBuyCrypto}
              showStaking={showStaking}
            />
          )}
        </div>
        
        <div className="md:col-span-4">
          {showResources && (
            <GameProgress 
              dollars={dollars}
              btc={btc}
              usdt={usdt}
              knowledge={knowledge}
            />
          )}
        </div>
      </div>
      
      <footer className="mt-6 text-center text-xs text-gray-500">
        <p>Щелкайте, чтобы открывать новые возможности</p>
      </footer>
    </div>
  );
};

export default CryptoGame;
