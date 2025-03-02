
import React, { useState, useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import ResourceDisplay from './ResourceDisplay';
import ActionButton from './ActionButton';
import Trading from './Trading';
import Education from './Education';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, GraduationCap, ArrowUpDown } from 'lucide-react';

const CryptoGame: React.FC = () => {
  // Основные ресурсы
  const [dollars, setDollars] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [btc, setBtc] = useState(0);
  const [stakedUsdt, setStakedUsdt] = useState(0);
  const [knowledge, setKnowledge] = useState(0);
  
  // Флаги открытия функций
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showResources, setShowResources] = useState(false);
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const [showStaking, setShowStaking] = useState(false);
  const [showTrading, setShowTrading] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
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
  
  // Проверка достижения целей и открытие новых возможностей
  useEffect(() => {
    if (dollars >= 100 && !showTrading) {
      setShowTrading(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете торговать на бирже.",
      });
    }

    if (dollars >= 200 && !showEducation) {
      setShowEducation(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете получать криптообразование.",
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
      });
    }
    
    if (clicks === 4) {
      setShowBuyCrypto(true);
      toast({
        title: "Новая возможность!",
        description: "Теперь вы можете покупать криптовалюту.",
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
      });
      
      if (purchaseAmount >= 50 && !showStaking) {
        setShowStaking(true);
        toast({
          title: "Новая возможность!",
          description: "Теперь вы можете использовать стейкинг криптовалюты для пассивного дохода.",
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
      });
    }
  };
  
  const handleTrade = (fromUSDT: boolean, amount: number) => {
    if (fromUSDT) {
      setUsdt(prev => prev - amount);
      // Пример конвертации: 1 USDT = 0.00002 BTC
      setBtc(prev => prev + amount * 0.00002);
    } else {
      setBtc(prev => prev - amount);
      // Пример конвертации обратно: 1 BTC = 50000 USDT (с 5% комиссией)
      setUsdt(prev => prev + amount * 50000 * 0.95);
    }
  };

  const handleLearn = (cost: number) => {
    setDollars(prev => prev - cost);
    setKnowledge(prev => Math.min(prev + 10, 100));
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
        />
      )}
      
      {(showTrading || showEducation) && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-3 animate-fade-in">
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
        </Tabs>
      )}
      
      {!(showTrading || showEducation) && (
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
      
      <footer className="mt-6 text-center text-xs text-gray-500">
        <p>Щелкайте, чтобы открывать новые возможности</p>
      </footer>
    </div>
  );
};

export default CryptoGame;
