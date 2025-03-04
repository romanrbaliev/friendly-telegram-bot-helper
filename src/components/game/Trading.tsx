
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TriangleAlert, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface TradingProps {
  dollars: number;
  usdt: number;
  btc: number;
  onTrade: (fromUSDT: boolean, amount: number) => void;
  knowledge: number;
  role: string | null;
}

const Trading: React.FC<TradingProps> = ({ 
  dollars, 
  usdt, 
  btc, 
  onTrade, 
  knowledge,
  role
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [error, setError] = useState<string | null>(null);
  
  // Рыночные параметры
  const btcPrice = 50000;
  const commissionRate = Math.max(5 - (knowledge / 20) - (role === 'trader' ? 1 : 0), 0.5) / 100;
  
  const handleTrade = () => {
    setError(null);
    
    // Проверка суммы
    if (amount <= 0) {
      setError("Введите положительную сумму");
      return;
    }
    
    if (tradeType === 'buy') {
      // Покупка BTC за USDT
      if (amount > usdt) {
        setError("Недостаточно USDT для покупки");
        return;
      }
      
      onTrade(true, amount);
    } else {
      // Продажа BTC за USDT
      if (amount > btc) {
        setError("Недостаточно BTC для продажи");
        return;
      }
      
      onTrade(false, amount);
    }
    
    setAmount(0); // Сбрасываем сумму после сделки
  };
  
  return (
    <div className="space-y-4">
      <Card className="bg-[#242A38] border-[#333A48] shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gradient">Торговля криптовалютами</CardTitle>
          <CardDescription className="text-gray-400">
            Покупайте и продавайте криптовалюты с выгодой
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-3 bg-[#1A1F2C] rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-400">Текущий курс BTC</span>
              <span className="text-sm font-medium">${btcPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Комиссия</span>
              <span className="text-sm font-medium">{(commissionRate * 100).toFixed(1)}%</span>
            </div>
            {role === 'trader' && (
              <div className="mt-2 pt-2 border-t border-[#333A48]">
                <span className="text-xs text-green-400 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  Бонус трейдера: -1% к комиссии
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={tradeType === 'buy' ? "default" : "outline"} 
                onClick={() => setTradeType('buy')}
                className={tradeType === 'buy' ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <TrendingUp size={16} className="mr-2" />
                Купить BTC
              </Button>
              <Button 
                variant={tradeType === 'sell' ? "default" : "outline"} 
                onClick={() => setTradeType('sell')}
                className={tradeType === 'sell' ? "bg-red-600 hover:bg-red-700" : ""}
              >
                <TrendingDown size={16} className="mr-2" />
                Продать BTC
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>
                {tradeType === 'buy' 
                  ? `Сумма USDT для обмена (у вас ${usdt.toFixed(2)} USDT)` 
                  : `Сумма BTC для продажи (у вас ${btc.toFixed(6)} BTC)`}
              </Label>
              <Input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="0"
                step={tradeType === 'buy' ? "1" : "0.0001"}
                className="bg-[#1A1F2C] border-[#333A48]"
              />
              
              {tradeType === 'buy' && amount > 0 && (
                <div className="flex items-center justify-between text-sm p-2 bg-[#1A1F2C] rounded-md">
                  <span>Вы получите:</span>
                  <span className="font-medium">
                    ≈ {(amount * 0.00002 * (role === 'trader' ? 1.05 : 1)).toFixed(6)} BTC
                  </span>
                </div>
              )}
              
              {tradeType === 'sell' && amount > 0 && (
                <div className="flex items-center justify-between text-sm p-2 bg-[#1A1F2C] rounded-md">
                  <span>Вы получите:</span>
                  <span className="font-medium">
                    ≈ {(amount * btcPrice * (1 - commissionRate)).toFixed(2)} USDT
                  </span>
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-red-400 text-sm flex items-center p-2 bg-red-900/20 rounded">
                <TriangleAlert size={14} className="mr-2" />
                {error}
              </div>
            )}
            
            <Button 
              onClick={handleTrade}
              className="w-full"
              disabled={amount <= 0}
            >
              {tradeType === 'buy' ? 'Купить BTC' : 'Продать BTC'}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trading;
