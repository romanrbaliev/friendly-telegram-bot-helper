
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Trophy, Lightbulb, Bitcoin, DollarSign, MousePointer } from 'lucide-react';

interface AchievementProps {
  clickCount: number;
  dollars: number;
  knowledge: number;
  miningPower: number;
  btc: number;
}

interface AchievementItemProps {
  title: string;
  description: string;
  current: number;
  target: number;
  icon: React.ReactNode;
  completed: boolean;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ 
  title, 
  description, 
  current, 
  target, 
  icon,
  completed
}) => {
  const progress = Math.min(100, (current / target) * 100);
  
  return (
    <div className={`border rounded-lg p-4 ${completed ? 'bg-green-900/20 border-green-500/40' : 'bg-gray-900/40 border-gray-700'}`}>
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-md ${completed ? 'bg-green-900/30 text-green-500' : 'bg-gray-800 text-gray-400'}`}>
          {icon}
        </div>
        <div className="ml-3">
          <h3 className={`font-medium ${completed ? 'text-green-400' : 'text-gray-200'}`}>{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        {completed && (
          <div className="ml-auto">
            <span className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-full">Выполнено!</span>
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span>{current} / {target}</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className={`h-1.5 ${completed ? 'bg-green-950' : 'bg-gray-800'}`} />
      </div>
    </div>
  );
};

const Achievements: React.FC<AchievementProps> = ({ 
  clickCount, 
  dollars, 
  knowledge, 
  miningPower,
  btc
}) => {
  const achievements = [
    // Кликер
    {
      title: "Начинающий кликер",
      description: "Сделайте 10 кликов",
      current: clickCount,
      target: 10,
      icon: <MousePointer size={16} />,
      completed: clickCount >= 10
    },
    {
      title: "Опытный кликер",
      description: "Сделайте 100 кликов",
      current: clickCount,
      target: 100,
      icon: <MousePointer size={16} />,
      completed: clickCount >= 100
    },
    {
      title: "Кликер-профессионал",
      description: "Сделайте 1000 кликов",
      current: clickCount,
      target: 1000,
      icon: <MousePointer size={16} />,
      completed: clickCount >= 1000
    },
    
    // Финансы
    {
      title: "Первый капитал",
      description: "Заработайте $100",
      current: dollars,
      target: 100,
      icon: <DollarSign size={16} />,
      completed: dollars >= 100
    },
    {
      title: "Инвестор",
      description: "Заработайте $1000",
      current: dollars,
      target: 1000,
      icon: <DollarSign size={16} />,
      completed: dollars >= 1000
    },
    {
      title: "Бизнесмен",
      description: "Заработайте $10000",
      current: dollars,
      target: 10000,
      icon: <DollarSign size={16} />,
      completed: dollars >= 10000
    },
    
    // Знания
    {
      title: "Новичок в крипте",
      description: "Получите 5 знаний",
      current: knowledge,
      target: 5,
      icon: <Lightbulb size={16} />,
      completed: knowledge >= 5
    },
    {
      title: "Криптоэнтузиаст",
      description: "Получите 20 знаний",
      current: knowledge,
      target: 20,
      icon: <Lightbulb size={16} />,
      completed: knowledge >= 20
    },
    {
      title: "Криптоэксперт",
      description: "Получите 50 знаний",
      current: knowledge,
      target: 50,
      icon: <Lightbulb size={16} />,
      completed: knowledge >= 50
    },
    
    // Майнинг
    {
      title: "Домашний майнер",
      description: "Достигните мощности майнинга 10",
      current: miningPower,
      target: 10,
      icon: <Trophy size={16} />,
      completed: miningPower >= 10
    },
    {
      title: "Фермер",
      description: "Достигните мощности майнинга 50",
      current: miningPower,
      target: 50,
      icon: <Trophy size={16} />,
      completed: miningPower >= 50
    },
    {
      title: "Крипто-магнат",
      description: "Накопите 0.1 BTC",
      current: btc,
      target: 0.1,
      icon: <Bitcoin size={16} />,
      completed: btc >= 0.1
    }
  ];
  
  const completedCount = achievements.filter(a => a.completed).length;
  const totalAchievements = achievements.length;
  const achievementProgress = (completedCount / totalAchievements) * 100;
  
  return (
    <div className="space-y-4">
      <div className="bg-gray-800/60 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gradient">Достижения</h2>
          <span className="text-sm text-gray-400">{completedCount} из {totalAchievements}</span>
        </div>
        <Progress value={achievementProgress} className="h-2 bg-gray-700" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <AchievementItem key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
