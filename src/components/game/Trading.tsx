
import React from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { ArrowUpDown } from 'lucide-react';

interface TradingProps {
  dollars: number;
  usdt: number;
  onTrade: (fromUSD: boolean, amount: number) => void;
}

const Trading: React.FC<TradingProps> = ({ dollars, usdt, onTrade }) => {
  const handleBuyBTC = () => {
    if (dollars >= 10) {
      onTrade(true, dollars);
      toast({
        title: "Успешная сделка",
        description: "Вы обменяли USD на BTC"
      });
    }
  };

  const handleSellBTC = () => {
    if (usdt >= 10) {
      onTrade(false, usdt);
      toast({
        title: "Успешная сделка",
        description: "Вы обменяли BTC на USD"
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
          disabled={dollars < 10}
          tooltip={dollars < 10 ? `Нужно минимум $10` : "Обменять USD на BTC"}
          longPressTooltip="Торговля на бирже позволяет заработать на разнице курсов"
        >
          Купить BTC
        </ActionButton>
        <ActionButton
          onClick={handleSellBTC}
          disabled={usdt < 10}
          tooltip={usdt < 10 ? `Нужно минимум 10 USDT` : "Обменять BTC на USD"}
        >
          Продать BTC
        </ActionButton>
      </div>
    </div>
  );
};

export default Trading;
