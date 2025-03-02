
import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { ArrowUpDown, ArrowRightLeft } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface TradingProps {
  dollars: number;
  usdt: number;
  btc: number;
  onTrade: (fromUSDT: boolean, amount: number) => void;
  knowledge: number;
}

const Trading: React.FC<TradingProps> = ({ dollars, usdt, btc, onTrade, knowledge }) => {
  const [amountPercentage, setAmountPercentage] = useState<number>(50);
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');
  
  // Trading fee reduced based on knowledge (min 0.5%)
  const tradingFee = Math.max(5 - (knowledge / 20), 0.5);
  
  const handleBuyBTC = () => {
    if (usdt >= 10) {
      const amount = (usdt * amountPercentage / 100);
      onTrade(true, amount);
      toast({
        title: "Успешная сделка",
        description: `Вы обменяли ${amount.toFixed(2)} USDT на BTC`
      });
    }
  };

  const handleSellBTC = () => {
    if (btc > 0) {
      const amount = (btc * amountPercentage / 100);
      onTrade(false, amount);
      toast({
        title: "Успешная сделка",
        description: `Вы обменяли ${amount.toFixed(8)} BTC на USDT`
      });
    }
  };

  const getMaxAmount = () => {
    return selectedTab === 'buy' ? usdt : btc;
  };

  const getCurrentAmount = () => {
    const max = getMaxAmount();
    return max * amountPercentage / 100;
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <ArrowUpDown size={20} />
        Трейдинг
      </h2>
      
      <div className="flex border border-gray-800 rounded-md overflow-hidden mb-4">
        <button 
          className={`flex-1 py-2 text-sm text-center transition-colors ${selectedTab === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-transparent text-gray-400'}`}
          onClick={() => setSelectedTab('buy')}
        >
          Купить BTC
        </button>
        <button 
          className={`flex-1 py-2 text-sm text-center transition-colors ${selectedTab === 'sell' ? 'bg-red-500/20 text-red-400' : 'bg-transparent text-gray-400'}`}
          onClick={() => setSelectedTab('sell')}
        >
          Продать BTC
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-800/50 p-3 rounded-md space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Комиссия:</span>
            <span className="text-white">{tradingFee.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Текущая цена:</span>
            <span className="text-white">1 BTC = 50,000 USDT</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Сумма ({amountPercentage}%):</span>
            <span className="text-white">
              {selectedTab === 'buy' 
                ? `${getCurrentAmount().toFixed(2)} USDT` 
                : `${getCurrentAmount().toFixed(8)} BTC`}
            </span>
          </div>
          
          <Slider
            value={[amountPercentage]}
            min={1}
            max={100}
            step={1}
            onValueChange={(value) => setAmountPercentage(value[0])}
            className="py-4"
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>1%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
        
        {selectedTab === 'buy' ? (
          <ActionButton
            onClick={handleBuyBTC}
            disabled={usdt < 10}
            tooltip={usdt < 10 ? `Нужно минимум 10 USDT` : `Обменять ${getCurrentAmount().toFixed(2)} USDT на BTC`}
            longPressTooltip="Торговля на бирже позволяет заработать на разнице курсов"
          >
            <ArrowRightLeft size={16} />
            Купить BTC за {getCurrentAmount().toFixed(2)} USDT
          </ActionButton>
        ) : (
          <ActionButton
            onClick={handleSellBTC}
            disabled={btc <= 0}
            tooltip={btc <= 0 ? `У вас нет BTC` : `Обменять ${getCurrentAmount().toFixed(8)} BTC на USDT`}
          >
            <ArrowRightLeft size={16} />
            Продать {getCurrentAmount().toFixed(8)} BTC
          </ActionButton>
        )}
      </div>
    </div>
  );
};

export default Trading;
