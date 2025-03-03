
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Trophy, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GameProgressProps {
  dollars: number;
  btc: number;
  usdt: number;
  knowledge: number;
}

const GameProgress: React.FC<GameProgressProps> = ({ 
  dollars,
  btc,
  usdt,
  knowledge
}) => {
  // Расчет общего прогресса в игре (от 0 до 100%)
  const calculateTotalProgress = (): number => {
    // Конвертируем BTC в доллары по курсу для оценки общего капитала
    const btcValue = btc * 50000;
    const totalCapital = dollars + usdt + btcValue;
    
    // Максимальная цель - 100,000$ эквивалента
    const capitalGoal = 100000;
    
    // Прогресс по капиталу (максимум 70% от общего прогресса)
    let capitalProgress = Math.min((totalCapital / capitalGoal) * 70, 70);
    
    // Прогресс по знаниям (максимум 30% от общего прогресса)
    let knowledgeProgress = (knowledge / 100) * 30;
    
    return Math.min(Math.floor(capitalProgress + knowledgeProgress), 100);
  };
  
  const getNextGoal = (): string => {
    const totalProgress = calculateTotalProgress();
    
    if (totalProgress < 10) return "Накопить $100";
    if (totalProgress < 20) return "Начать торговлю криптовалютой";
    if (totalProgress < 30) return "Получить базовые знания";
    if (totalProgress < 40) return "Начать майнинг";
    if (totalProgress < 60) return "Выбрать карьерный путь";
    if (totalProgress < 80) return "Накопить $10,000";
    return "Достичь $100,000";
  };
  
  const getTotalCapital = (): number => {
    const btcValue = btc * 50000;
    return dollars + usdt + btcValue;
  };
  
  const getProgressBadge = (): { label: string, color: string } => {
    const progress = calculateTotalProgress();
    
    if (progress < 20) return { label: "Новичок", color: "bg-gray-500" };
    if (progress < 40) return { label: "Любитель", color: "bg-green-600" };
    if (progress < 60) return { label: "Энтузиаст", color: "bg-blue-600" };
    if (progress < 80) return { label: "Профессионал", color: "bg-purple-600" };
    return { label: "Эксперт", color: "bg-amber-500" };
  };
  
  const progressBadge = getProgressBadge();
  const totalProgress = calculateTotalProgress();
  
  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <Trophy size={20} className="text-amber-400" />
        Прогресс игры
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-300">Общий прогресс:</span>
          <Badge className={`${progressBadge.color} hover:${progressBadge.color}`}>
            {progressBadge.label}
          </Badge>
        </div>
        
        <div className="mb-4">
          <Progress value={totalProgress} className="h-2.5" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Target size={16} className="text-blue-400" />
            <span className="text-gray-300">Следующая цель:</span>
          </div>
          <span className="text-white">{getNextGoal()}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm border-t border-white/10 pt-3 mt-3">
          <span className="text-gray-300">Общий капитал:</span>
          <span className="font-mono text-white">${getTotalCapital().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default GameProgress;
