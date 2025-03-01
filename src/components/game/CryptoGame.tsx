
import React, { useState, useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import ResourceDisplay from './ResourceDisplay';
import ActionButton from './ActionButton';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const CryptoGame: React.FC = () => {
  // Состояние игры
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [dollars, setDollars] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [stakedUsdt, setStakedUsdt] = useState(0);
  const [clicks, setClicks] = useState(0);
  
  // Флаги открытия функций
  const [showResources, setShowResources] = useState(false);
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const [showStaking, setShowStaking] = useState(false);
  
  // Интервал для стейкинга
  useEffect(() => {
    let stakingInterval: NodeJS.Timeout | null = null;
    
    if (stakedUsdt > 0) {
      stakingInterval = setInterval(() => {
        // Начисляем 0.1% от стейкинга каждые 10 секунд (примерно 10% годовых)
        const reward = stakedUsdt * 0.001;
        setUsdt(prev => prev + reward);
      }, 10000);
    }
    
    return () => {
      if (stakingInterval) clearInterval(stakingInterval);
    };
  }, [stakedUsdt]);
  
  // Обработчики действий
  const handleSaveDollar = () => {
    setDollars(prev => prev + 1);
    setClicks(prev => prev + 1);
    
    // Открываем показ ресурсов после первого клика
    if (!showResources) {
      setShowResources(true);
      toast({
        title: "Новый раздел открыт!",
        description: "Теперь вы можете отслеживать свои ресурсы.",
      });
    }
    
    // Открываем покупку криптовалюты после 5 кликов
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
      const fee = purchaseAmount * 0.05; // 5% комиссия
      const finalAmount = purchaseAmount - fee;
      
      setDollars(0);
      setUsdt(prev => prev + finalAmount);
      
      toast({
        title: "Покупка криптовалюты",
        description: `Вы купили ${finalAmount.toFixed(2)} USDT. Комиссия составила ${fee.toFixed(2)}$.`,
      });
      
      // Открываем стейкинг если у пользователя было более 50$ при покупке
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
        />
      )}
      
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
      
      <footer className="mt-6 text-center text-xs text-gray-500">
        <p>Щелкайте, чтобы открывать новые возможности</p>
      </footer>
    </div>
  );
};

export default CryptoGame;
