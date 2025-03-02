
import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { ArrowUpDown } from 'lucide-react';

interface TradingProps {
  dollars: number;
  usdt: number;
  btc: number;
  onTrade: (fromUSDT: boolean, amount: number) => void;
}

const Trading: React.FC<TradingProps> = ({ dollars, usdt, btc, onTrade }) => {
  const [amount, setAmount] = useState<number>(10);
  
  const handleBuyBTC = () => {
    if (usdt >= 10) {
      onTrade(true, amount > usdt ? usdt : amount);
      toast({
        title: "Успешная сделка",
        description: "Вы обменяли USDT на BTC"
      });
    }
  };

  const handleSellBTC = () => {
    if (btc > 0) {
      onTrade(false, btc);
      toast({
        title: "Успешная сделка",
        description: "Вы обменяли BTC на USDT"
      });
    }
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <ArrowUpDown size={20} />
        Трейдинг
      </h2>
      <div className="space-y-4">
        <ActionButton
          onClick={handleBuyBTC}
          disabled={usdt < 10}
          tooltip={usdt < 10 ? `Нужно минимум 10 USDT` : "Обменять USDT на BTC"}
          longPressTooltip="Торговля на бирже позволяет заработать на разнице курсов"
        >
          Купить BTC
        </ActionButton>
        <ActionButton
          onClick={handleSellBTC}
          disabled={btc <= 0}
          tooltip={btc <= 0 ? `У вас нет BTC` : "Обменять BTC на USDT"}
        >
          Продать BTC
        </ActionButton>
      </div>
    </div>
  );
};

export default Trading;
