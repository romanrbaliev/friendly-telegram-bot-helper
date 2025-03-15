
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
  // Рассчитываем доходность
  const baseApy = 10; // 10% годовых
  const roleBonus = role === 'investor' ? 10 : 0; // +10% для инвесторов
  const totalApy = baseApy + roleBonus;
  
  // Рассчитываем доход
  const dailyIncome = stakedUsdt * totalApy / 365 / 100;
  const monthlyIncome = dailyIncome * 30;
  const yearlyIncome = stakedUsdt * totalApy / 100;
  
  const handleStakePercentage = (percentage: number) => {
    if (usdt <= 0) {
      toast({
        title: "Недостаточно USDT",
        description: `У вас только ${usdt.toFixed(2)} USDT`,
        duration: 3000
      });
      return;
    }
    
    const amount = Math.floor((usdt * percentage / 100) * 100) / 100;
    
    if (amount <= 0) {
      toast({
        title: "Некорректная сумма",
        description: "Сумма слишком мала",
        duration: 3000
      });
      return;
    }
    
    onStake(amount);
    toast({
      title: "Средства отправлены в стейкинг",
      description: `Вы добавили ${amount.toFixed(2)} USDT (${percentage}%) в стейкинг`,
      duration: 3000
    });
  };
  
  const handleWithdrawPercentage = (percentage: number) => {
    if (stakedUsdt <= 0) {
      toast({
        title: "Нет средств в стейкинге",
        description: `У вас нет USDT в стейкинге`,
        duration: 3000
      });
      return;
    }
    
    const amount = Math.floor((stakedUsdt * percentage / 100) * 100) / 100;
    
    if (amount <= 0) {
      toast({
        title: "Некорректная сумма",
        description: "Сумма слишком мала",
        duration: 3000
      });
      return;
    }
    
    onWithdraw(amount);
    toast({
      title: "Средства выведены из стейкинга",
      description: `Вы вывели ${amount.toFixed(2)} USDT (${percentage}%) из стейкинга`,
      duration: 3000
    });
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
          <div className="bg-gray-800/50 p-3 rounded-lg space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Баланс USDT:</span>
              <span className="font-mono text-sm text-white">{usdt.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">В стейкинге:</span>
              <span className="font-mono text-sm text-white">{stakedUsdt.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-300">Годовая доходность:</span>
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
              <span className="font-mono text-sm text-green-400">{totalApy}% APY</span>
            </div>
          </div>
          
          {/* Прогноз доходности */}
          <div className="bg-gray-800/50 p-3 rounded-lg space-y-2.5">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-green-400" />
              Прогноз доходности
            </h4>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Ежедневно:</span>
              <span className="font-mono text-sm text-white">+{dailyIncome.toFixed(4)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Ежемесячно:</span>
              <span className="font-mono text-sm text-white">+{monthlyIncome.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Ежегодно:</span>
              <span className="font-mono text-sm text-white">+{yearlyIncome.toFixed(2)} USDT</span>
            </div>
          </div>
          
          {/* Внесение средств в стейкинг */}
          <div className="bg-gray-800/50 p-3 rounded-lg space-y-2.5">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <Lock size={16} className="text-blue-400" />
              Внести в стейкинг
            </h4>
            
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStakePercentage(10)}
                disabled={usdt <= 0}
                className="text-xs"
              >
                10%
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStakePercentage(25)}
                disabled={usdt <= 0}
                className="text-xs"
              >
                25%
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStakePercentage(50)}
                disabled={usdt <= 0}
                className="text-xs"
              >
                50%
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStakePercentage(100)}
                disabled={usdt <= 0}
                className="text-xs"
              >
                100%
              </Button>
            </div>
            
            <Button 
              onClick={() => handleStakePercentage(100)} 
              className="w-full bg-[#26A17B] hover:bg-[#1f8e6b] text-sm"
              disabled={usdt <= 0}
            >
              Внести весь баланс в стейкинг
            </Button>
          </div>
          
          {/* Вывод средств из стейкинга */}
          {stakedUsdt > 0 && (
            <div className="bg-gray-800/50 p-3 rounded-lg space-y-2.5">
              <h4 className="text-sm font-medium text-white flex items-center gap-2">
                <UnlockKeyhole size={16} className="text-yellow-400" />
                Вывести из стейкинга
              </h4>
              
              <div className="grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleWithdrawPercentage(10)}
                  disabled={stakedUsdt <= 0}
                  className="text-xs"
                >
                  10%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleWithdrawPercentage(25)}
                  disabled={stakedUsdt <= 0}
                  className="text-xs"
                >
                  25%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleWithdrawPercentage(50)}
                  disabled={stakedUsdt <= 0}
                  className="text-xs"
                >
                  50%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleWithdrawPercentage(100)}
                  disabled={stakedUsdt <= 0}
                  className="text-xs"
                >
                  100%
                </Button>
              </div>
              
              <Button 
                onClick={() => handleWithdrawPercentage(100)} 
                className="w-full bg-gray-700 hover:bg-gray-600 text-sm"
                disabled={stakedUsdt <= 0}
              >
                Вывести все из стейкинга
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
