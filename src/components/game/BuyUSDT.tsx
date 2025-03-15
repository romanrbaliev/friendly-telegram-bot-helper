
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, DollarSign } from "lucide-react";
import { toast } from '@/components/ui/use-toast';

interface BuyUSDTProps {
  dollars: number;
  onBuyUSDT: (amount: number) => void;
  knowledge: number;
}

const BuyUSDT: React.FC<BuyUSDTProps> = ({ dollars, onBuyUSDT, knowledge }) => {
  const [amount, setAmount] = useState<number>(10);
  
  // Комиссия снижается с ростом знаний
  const calculateFee = () => {
    let baseFee = 5; // Базовая комиссия 5%
    
    // Уменьшаем комиссию с ростом знаний
    if (knowledge >= 5) baseFee = 4;
    if (knowledge >= 10) baseFee = 3;
    if (knowledge >= 20) baseFee = 2;
    if (knowledge >= 50) baseFee = 1;
    
    return baseFee;
  };
  
  const fee = calculateFee();
  const usdtReceived = amount * (1 - fee/100);
  const totalCost = amount;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };
  
  const handleBuy = () => {
    if (amount > dollars) {
      toast({
        title: "Недостаточно средств",
        description: `У вас только $${dollars.toFixed(2)}`,
        duration: 3000
      });
      return;
    }
    
    if (amount <= 0) {
      toast({
        title: "Некорректная сумма",
        description: "Введите сумму больше 0",
        duration: 3000
      });
      return;
    }
    
    onBuyUSDT(amount);
    toast({
      title: "Покупка USDT",
      description: `Вы купили ${usdtReceived.toFixed(2)} USDT за $${amount.toFixed(2)}`,
      duration: 3000
    });
  };
  
  const handleMax = () => {
    setAmount(Math.floor(dollars * 100) / 100);
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-3 text-white">Покупка USDT</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount" className="text-gray-300">Сумма (USD)</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMax}
              className="whitespace-nowrap"
            >
              Макс.
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-400" />
            <span className="text-gray-300">Вы платите:</span>
          </div>
          <span className="font-mono">${totalCost.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#26A17B] flex items-center justify-center text-[8px] font-bold text-white">₮</span>
            <span className="text-gray-300">Вы получите:</span>
          </div>
          <span className="font-mono">{usdtReceived.toFixed(2)} USDT</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
          <span className="text-gray-300">Комиссия:</span>
          <span className="font-mono text-yellow-400">{fee}%</span>
        </div>
        
        <Button 
          onClick={handleBuy} 
          className="w-full bg-[#26A17B] hover:bg-[#1f8e6b] flex items-center justify-center gap-2"
          disabled={amount <= 0 || amount > dollars}
        >
          Купить USDT
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default BuyUSDT;
