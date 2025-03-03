import React, { useState, useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import ResourceDisplay from './ResourceDisplay';
import ActionButton from './ActionButton';
import Trading from './Trading';
import Education from './Education';
import Mining from './Mining';
import Career from './Career';
import MarketEvents from './MarketEvents';
import GameProgress from './GameProgress';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, GraduationCap, ArrowUpDown, HardDrive, Briefcase, BarChart4, Trophy } from 'lucide-react';

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
  
  // Стейкинг
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
  }, [stakedUsdt]);
  
  // Майнинг
  useEffect(() => {
    let miningInterval: NodeJS.Timeout | null = null;
    
    if (miningPower > 0) {
      miningInterval = setInterval(() => {
        const mined = miningPower * 0.00001;
        setBtc(prev => prev + mined);
      }, 10000);
    }
    
    return () => {
      if (miningInterval) clearInterval(miningInterval);
    };
  }, [miningPower]);
  
  // Проверка достижения целей и открытие новых возможностей
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
  }, [dollars]);
  
  const handleSaveDollar = () => {
    setDollars(prev => prev + 1);
    setClicks(prev => prev + 1);
    
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
      
      if (purchaseAmount >= 50 && !showStaking) {
        setShowStaking(true);
        toast({
          title: "Новая возможность!",
          description: "Теперь вы можете использовать стейкинг криптовалюты для пассивного дохода.",
          duration: 3000
        });
      }
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
          
          {(showTrading || showEducation || showMining || showCareer || showMarketEvents) && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="w-full animate-fade-in" style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${1 + 
                  (showTrading ? 1 : 0) + 
                  (showEducation ? 1 : 0) + 
                  (showMining ? 1 : 0) + 
                  (showCareer ? 1 : 0) + 
                  (showMarketEvents ? 1 : 0)}, minmax(0, 1fr))` 
              }}>
                <TabsTrigger value="main" className="flex items-center gap-1">
                  <DollarSign size={16} />
                  Основное
                </TabsTrigger>
                {showTrading && (
                  <TabsTrigger value="trading" className="flex items-center gap-1">
                    <ArrowUpDown size={16} />
                    Трейдинг
                  </TabsTrigger>
                )}
                {showEducation && (
                  <TabsTrigger value="education" className="flex items-center gap-1">
                    <GraduationCap size={16} />
                    Образование
                  </TabsTrigger>
                )}
                {showMining && (
                  <TabsTrigger value="mining" className="flex items-center gap-1">
                    <HardDrive size={16} />
                    Майнинг
                  </TabsTrigger>
                )}
                {showCareer && (
                  <TabsTrigger value="career" className="flex items-center gap-1">
                    <Briefcase size={16} />
                    Карьера
                  </TabsTrigger>
                )}
                {showMarketEvents && (
                  <TabsTrigger value="market" className="flex items-center gap-1">
                    <BarChart4 size={16} />
                    Рынок
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="main" className="space-y-4 mt-4">
                <ActionButton 
                  onClick={handleSaveDollar}
                  tooltip="Отложите $1 на инвестиции"
                >
                  Отложить $1 на инвестиции
                </ActionButton>
                
                {showBuyCrypto && (
                  <ActionButton 
                    onClick={handleBuyCrypto}
                    disabled={dollars < 10}
                    tooltip={dollars < 10 ? `Нужно еще ${10 - dollars}$` : "Обменять все доллары на USDT"}
                    longPressTooltip="Вы покупаете криптовалюту для инвестиций. При покупке списывается комиссия 5% от суммы."
                    longPressTime={2000}
                  >
                    Купить криптовалюту (USDT)
                  </ActionButton>
                )}
                
                {showStaking && (
                  <ActionButton 
                    onClick={handleStaking}
                    disabled={usdt < 10}
                    tooltip={usdt < 10 ? `Нужно еще ${10 - usdt} USDT` : "Разместить 10 USDT в стейкинге"}
                    longPressTooltip="Стейкинг позволяет получать пассивный доход в размере ~10% годовых."
                    longPressTime={2000}
                  >
                    Стейкинг USDT
                  </ActionButton>
                )}
              </TabsContent>
              
              {showTrading && (
                <TabsContent value="trading" className="mt-4">
                  <Trading 
                    dollars={dollars}
                    usdt={usdt}
                    btc={btc}
                    onTrade={handleTrade}
                    knowledge={knowledge}
                  />
                </TabsContent>
              )}
              
              {showEducation && (
                <TabsContent value="education" className="mt-4">
                  <Education
                    dollars={dollars}
                    onLearn={handleLearn}
                    knowledge={knowledge}
                  />
                </TabsContent>
              )}
              
              {showMining && (
                <TabsContent value="mining" className="mt-4">
                  <Mining
                    dollars={dollars}
                    btc={btc}
                    onPurchaseRig={handlePurchaseRig}
                    knowledge={knowledge}
                    marketMultiplier={marketMultiplier}
                  />
                </TabsContent>
              )}
              
              {showCareer && (
                <TabsContent value="career" className="mt-4">
                  <Career
                    dollars={dollars}
                    onSelectRole={handleSelectRole}
                    selectedRole={role}
                    knowledge={knowledge}
                  />
                </TabsContent>
              )}
              
              {showMarketEvents && (
                <TabsContent value="market" className="mt-4">
                  <MarketEvents
                    knowledge={knowledge}
                    onPrepareForEvent={handlePrepareForEvent}
                    onMarketChange={handleMarketChange}
                  />
                </TabsContent>
              )}
            </Tabs>
          )}
          
          {!(showTrading || showEducation || showMining || showCareer || showMarketEvents) && (
            <div className="flex-1 flex flex-col gap-4">
              <ActionButton 
                onClick={handleSaveDollar}
                tooltip="Отложите $1 на инвестиции"
              >
                Отложить $1 на инвестиции
              </ActionButton>
              
              {showBuyCrypto && (
                <ActionButton 
                  onClick={handleBuyCrypto}
                  disabled={dollars < 10}
                  tooltip={dollars < 10 ? `Нужно еще ${10 - dollars}$` : "Обменять все доллары на USDT"}
                  longPressTooltip="Вы покупаете криптовалюту для инвестиций. При покупке списывается комиссия 5% от суммы."
                  longPressTime={2000}
                >
                  Купить криптовалюту (USDT)
                </ActionButton>
              )}
              
              {showStaking && (
                <ActionButton 
                  onClick={handleStaking}
                  disabled={usdt < 10}
                  tooltip={usdt < 10 ? `Нужно еще ${10 - usdt} USDT` : "Разместить 10 USDT в стейкинге"}
                  longPressTooltip="Стейкинг позволяет получать пассивный доход в размере ~10% годовых."
                  longPressTime={2000}
                >
                  Стейкинг USDT
                </ActionButton>
              )}
            </div>
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
