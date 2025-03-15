
import React, { useState, useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import ResourceDisplay from './ResourceDisplay';
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
  
  // Добавляем логи для отладки состояния игры
  useEffect(() => {
    console.log('Game state updated:', {
      dollars,
      usdt,
      btc,
      knowledge,
      showResources,
      showBuyCrypto,
      showStaking,
      showTrading,
      showEducation,
      showMining
    });
  }, [dollars, usdt, btc, knowledge, showResources, showBuyCrypto, showStaking, showTrading, showEducation, showMining]);
  
  // Обработчики действий
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
  
  const handleStaking = () => {
    console.log("handleStaking вызван, текущий баланс: $", dollars);
    if (dollars >= 100) {
      setDollars(prev => {
        console.log(`Баланс до активации стейкинга: $${prev}`);
        return prev - 100;
      });
      setStakedUsdt(prev => prev + 10);
      
      toast({
        title: "Фоновый стейкинг активирован",
        description: "Вы будете получать пассивный доход даже когда не играете!",
        duration: 3000
      });
      console.log("Стейкинг успешно активирован");
    } else {
      console.log("Недостаточно средств для активации стейкинга");
      toast({
        title: "Недостаточно средств",
        description: "Нужно $100 для активации стейкинга",
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
      
      // Only increase mining power if powerIncrease is provided and greater than 0
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
        <div className="md:col-span-12">
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
              miningPower={miningPower}
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
              clicks={clicks}
            />
          ) : (
            <MainActions 
              dollars={dollars}
              usdt={usdt}
              showBuyCrypto={showBuyCrypto}
              showStaking={showStaking}
              showEducation={showEducation}
              handleSaveDollar={handleSaveDollar}
              handleBuyCrypto={handleBuyCrypto}
              handleStaking={handleStaking}
              handleLearnBasics={handleLearnBasics}
              knowledge={knowledge}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoGame;
