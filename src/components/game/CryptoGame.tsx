
import React, { useState, useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import ResourceDisplay from './ResourceDisplay';
import GameProgress from './GameProgress';
import GameTabs from './GameTabs';
import MainActions from './MainActions';
import { toast } from '@/components/ui/use-toast';
import { useGameEffects } from '@/hooks/useGameEffects';

const SAVE_KEY = 'crypto_clicker_save_data';

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
  const { handleAirdrop, handleLearn, bullMarketActive } = useGameEffects({
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
  });
  
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
        dollars,
        usdt,
        btc,
        stakedUsdt,
        knowledge,
        miningPower,
        showResources,
        showBuyCrypto,
        showStaking,
        showTrading,
        showEducation,
        showMining,
        showCareer,
        showMarketEvents,
        clicks,
        role,
        lastSaved: Date.now()
      };
      
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameData));
    }, 30000);
    
    return () => clearInterval(saveInterval);
  }, [dollars, usdt, btc, stakedUsdt, knowledge, miningPower, showResources, showBuyCrypto, 
      showStaking, showTrading, showEducation, showMining, showCareer, showMarketEvents, 
      clicks, role]);
  
  // Обработчики действий
  const handleSaveDollar = () => {
    const reward = handleAirdrop();
    setClicks(prev => prev + 1);
  };
  
  const handleBuyCrypto = () => {
    if (dollars >= 50) {
      setDollars(prev => prev - 50);
      setBtc(prev => prev + 0.001);
      
      toast({
        title: "Покупка криптовалюты",
        description: "Вы купили свою первую криптовалюту: 0.001 BTC!",
        duration: 3000
      });
    }
  };
  
  const handleStaking = () => {
    if (dollars >= 100) {
      setDollars(prev => prev - 100);
      setStakedUsdt(prev => prev + 10);
      
      toast({
        title: "Фоновый стейкинг активирован",
        description: "Вы будете получать пассивный доход даже когда не играете!",
        duration: 3000
      });
    }
  };
  
  const handleLearnBasics = () => {
    if (dollars >= 10) {
      setDollars(prev => prev - 10);
      setKnowledge(prev => prev + 1);
      
      toast({
        title: "Знания получены!",
        description: "Вы изучили основы криптовалют.",
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

  const handleLearnMarket = () => {
    return handleLearn(200, 5);
  };
  
  const handlePurchaseRig = (cost: number) => {
    if (dollars >= cost) {
      setDollars(prev => prev - cost);
      setMiningPower(prev => prev + 1);
      
      toast({
        title: "Оборудование куплено!",
        description: "Вы начали майнить криптовалюту.",
        duration: 3000
      });
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
        {bullMarketActive && (
          <div className="mt-2 px-3 py-1 bg-green-600/20 rounded-full text-green-400 text-xs inline-flex items-center">
            <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            Бычий рынок активен! +50% к доходности
          </div>
        )}
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
              showKnowledge={showEducation || knowledge > 0}
              btc={btc}
              showBtc={btc > 0 || showBuyCrypto}
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
              handleLearn={handleLearnMarket}
              handlePurchaseRig={handlePurchaseRig}
              handleSelectRole={handleSelectRole}
              handleMarketChange={handleMarketChange}
              handlePrepareForEvent={handlePrepareForEvent}
              showBuyCrypto={showBuyCrypto}
              showStaking={showStaking}
              role={role}
              handleLearnBasics={handleLearnBasics}
            />
          ) : (
            <MainActions 
              dollars={dollars}
              usdt={usdt}
              handleSaveDollar={handleSaveDollar}
              handleBuyCrypto={handleBuyCrypto}
              handleStaking={handleStaking}
              handleLearnBasics={handleLearnBasics}
              showBuyCrypto={showBuyCrypto}
              showStaking={showStaking}
              showEducation={showEducation}
              knowledge={knowledge}
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
