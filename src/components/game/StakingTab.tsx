
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, TrendingUp, Lock, UnlockKeyhole } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StakingTabProps {
  usdt: number;
  stakedUsdt: number;
  onStake: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  role: string | null;
}

const StakingTab: React.FC<StakingTabProps> = ({ 
  usdt, 
  stakedUsdt, 
  onStake,
  onWithdraw,
  role
}) => {
  const [amount, setAmount] = useState<number>(10);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  
  // Рассчитываем доходность
  const baseApy = 10; // 10% годовых
  const roleBonus = role === 'investor' ? 10 : 0; // +10% для инвесторов
  const totalApy = baseApy + roleBonus;
  
  // Рассчитываем доход
  const dailyIncome = stakedUsdt * totalApy / 365 / 100;
  const monthlyIncome = dailyIncome * 30;
  const yearlyIncome = stakedUsdt * totalApy / 100;
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };
  
  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= stakedUsdt) {
      setWithdrawAmount(value);
    }
  };
  
  const handleStake = () => {
    if (amount > usdt) {
      toast({
        title: "Недостаточно USDT",
        description: `У вас только ${usdt.toFixed(2)} USDT`,
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
    
    onStake(amount);
    toast({
      title: "Средства отправлены в стейкинг",
      description: `Вы добавили ${amount.toFixed(2)} USDT в стейкинг`,
      duration: 3000
    });
  };
  
  const handleWithdraw = () => {
    if (withdrawAmount > stakedUsdt) {
      toast({
        title: "Недостаточно средств в стейкинге",
        description: `У вас только ${stakedUsdt.toFixed(2)} USDT в стейкинге`,
        duration: 3000
      });
      return;
    }
    
    if (withdrawAmount <= 0) {
      toast({
        title: "Некорректная сумма",
        description: "Введите сумму больше 0",
        duration: 3000
      });
      return;
    }
    
    onWithdraw(withdrawAmount);
    toast({
      title: "Средства выведены из стейкинга",
      description: `Вы вывели ${withdrawAmount.toFixed(2)} USDT из стейкинга`,
      duration: 3000
    });
  };
  
  const handleMax = () => {
    setAmount(Math.floor(usdt * 100) / 100);
  };
  
  const handleWithdrawMax = () => {
    setWithdrawAmount(Math.floor(stakedUsdt * 100) / 100);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="glass-morphism p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="text-[#26A17B]" size={20} />
          <h3 className="text-xl font-semibold text-white">Стейкинг USDT</h3>
        </div>
        
        <div className="space-y-4">
          {/* Информация о стейкинге */}
          <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Баланс USDT:</span>
              <span className="font-mono text-white">{usdt.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">В стейкинге:</span>
              <span className="font-mono text-white">{stakedUsdt.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-gray-300">Годовая доходность:</span>
                {role === 'investor' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="ml-1 text-xs py-0 text-yellow-400">+10%</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Бонус инвестора</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <span className="font-mono text-green-400">{totalApy}% APY</span>
            </div>
          </div>
          
          {/* Прогноз доходности */}
          <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
            <h4 className="text-md font-medium text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-green-400" />
              Прогноз доходности
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Ежедневно:</span>
              <span className="font-mono text-white">+{dailyIncome.toFixed(4)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Ежемесячно:</span>
              <span className="font-mono text-white">+{monthlyIncome.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Ежегодно:</span>
              <span className="font-mono text-white">+{yearlyIncome.toFixed(2)} USDT</span>
            </div>
          </div>
          
          {/* Внесение средств в стейкинг */}
          <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
            <h4 className="text-md font-medium text-white flex items-center gap-2">
              <Lock size={16} className="text-blue-400" />
              Внести в стейкинг
            </h4>
            <div>
              <Label htmlFor="stakeAmount" className="text-gray-300">Сумма (USDT)</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="stakeAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={handleAmountChange}
                  className="bg-gray-700 border-gray-600 text-white"
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
            <Button 
              onClick={handleStake} 
              className="w-full bg-[#26A17B] hover:bg-[#1f8e6b]"
              disabled={amount <= 0 || amount > usdt}
            >
              Внести в стейкинг
            </Button>
          </div>
          
          {/* Вывод средств из стейкинга */}
          {stakedUsdt > 0 && (
            <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
              <h4 className="text-md font-medium text-white flex items-center gap-2">
                <UnlockKeyhole size={16} className="text-yellow-400" />
                Вывести из стейкинга
              </h4>
              <div>
                <Label htmlFor="withdrawAmount" className="text-gray-300">Сумма (USDT)</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="withdrawAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={withdrawAmount}
                    onChange={handleWithdrawChange}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleWithdrawMax}
                    className="whitespace-nowrap"
                  >
                    Макс.
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleWithdraw} 
                className="w-full bg-gray-700 hover:bg-gray-600"
                disabled={withdrawAmount <= 0 || withdrawAmount > stakedUsdt}
              >
                Вывести из стейкинга
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StakingTab;

// Добавим компонент Badge, который используется в компоненте
const Badge = ({ children, variant, className }: { children: React.ReactNode, variant: string, className: string }) => {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs ${variant === 'outline' ? 'border border-gray-600' : 'bg-green-500 text-white'} ${className}`}>
      {children}
    </span>
  );
};
