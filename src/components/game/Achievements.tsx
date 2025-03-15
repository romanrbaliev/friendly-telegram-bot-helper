
import React from 'react';
import { Medal, Star, Trophy, Award, Zap } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  currentValue: number;
  targetValue: number;
  icon: React.ReactNode;
  category: 'клики' | 'финансы' | 'обучение' | 'майнинг';
  completed: boolean;
}

interface AchievementsProps {
  clickCount: number;
  dollars: number;
  knowledge: number;
  miningPower: number;
  btc: number;
}

const Achievements: React.FC<AchievementsProps> = ({
  clickCount,
  dollars,
  knowledge,
  miningPower,
  btc
}) => {
  // Определяем достижения на основе текущего прогресса
  const achievements: Achievement[] = [
    {
      id: 'clicks_10',
      title: 'Начинающий кликер',
      description: 'Сделайте 10 кликов',
      currentValue: Math.min(clickCount, 10),
      targetValue: 10,
      icon: <Medal className="text-amber-400" size={18} />,
      category: 'клики',
      completed: clickCount >= 10
    },
    {
      id: 'clicks_50',
      title: 'Опытный кликер',
      description: 'Сделайте 50 кликов',
      currentValue: Math.min(clickCount, 50),
      targetValue: 50,
      icon: <Medal className="text-amber-400" size={18} />,
      category: 'клики',
      completed: clickCount >= 50
    },
    {
      id: 'clicks_100',
      title: 'Мастер кликер',
      description: 'Сделайте 100 кликов',
      currentValue: Math.min(clickCount, 100),
      targetValue: 100,
      icon: <Medal className="text-amber-400" size={18} />,
      category: 'клики',
      completed: clickCount >= 100
    },
    {
      id: 'dollars_50',
      title: 'Первый капитал',
      description: 'Накопите $50',
      currentValue: Math.min(dollars, 50),
      targetValue: 50,
      icon: <Star className="text-green-400" size={18} />,
      category: 'финансы',
      completed: dollars >= 50
    },
    {
      id: 'dollars_100',
      title: 'Растущий капитал',
      description: 'Накопите $100',
      currentValue: Math.min(dollars, 100),
      targetValue: 100,
      icon: <Star className="text-green-400" size={18} />,
      category: 'финансы',
      completed: dollars >= 100
    },
    {
      id: 'dollars_500',
      title: 'Серьёзный инвестор',
      description: 'Накопите $500',
      currentValue: Math.min(dollars, 500),
      targetValue: 500,
      icon: <Trophy className="text-green-400" size={18} />,
      category: 'финансы',
      completed: dollars >= 500
    },
    {
      id: 'knowledge_10',
      title: 'Криптоэнтузиаст',
      description: 'Достигните 10 знаний о криптовалютах',
      currentValue: Math.min(knowledge, 10),
      targetValue: 10,
      icon: <Award className="text-blue-400" size={18} />,
      category: 'обучение',
      completed: knowledge >= 10
    },
    {
      id: 'knowledge_30',
      title: 'Криптоэксперт',
      description: 'Достигните 30 знаний о криптовалютах',
      currentValue: Math.min(knowledge, 30),
      targetValue: 30,
      icon: <Award className="text-blue-400" size={18} />,
      category: 'обучение',
      completed: knowledge >= 30
    },
    {
      id: 'knowledge_50',
      title: 'Криптогуру',
      description: 'Достигните 50 знаний о криптовалютах',
      currentValue: Math.min(knowledge, 50),
      targetValue: 50,
      icon: <Award className="text-blue-400" size={18} />,
      category: 'обучение',
      completed: knowledge >= 50
    },
    {
      id: 'mining_1',
      title: 'Начинающий майнер',
      description: 'Получите первую мощность майнинга',
      currentValue: Math.min(miningPower, 1),
      targetValue: 1,
      icon: <Zap className="text-purple-400" size={18} />,
      category: 'майнинг',
      completed: miningPower >= 1
    },
    {
      id: 'mining_5',
      title: 'Продвинутый майнер',
      description: 'Достигните 5 мощности майнинга',
      currentValue: Math.min(miningPower, 5),
      targetValue: 5,
      icon: <Zap className="text-purple-400" size={18} />,
      category: 'майнинг',
      completed: miningPower >= 5
    },
    {
      id: 'mining_10',
      title: 'Майнинг-ферма',
      description: 'Достигните 10 мощности майнинга',
      currentValue: Math.min(miningPower, 10),
      targetValue: 10,
      icon: <Zap className="text-purple-400" size={18} />,
      category: 'майнинг',
      completed: miningPower >= 10
    },
  ];

  // Группируем достижения по категориям
  const categories = {
    'клики': achievements.filter(a => a.category === 'клики'),
    'финансы': achievements.filter(a => a.category === 'финансы'),
    'обучение': achievements.filter(a => a.category === 'обучение'),
    'майнинг': achievements.filter(a => a.category === 'майнинг'),
  };

  // Считаем общий прогресс достижений
  const completedAchievements = achievements.filter(a => a.completed).length;
  const totalAchievements = achievements.length;
  const achievementProgress = (completedAchievements / totalAchievements) * 100;

  return (
    <div className="glass-morphism p-4 rounded-lg space-y-4">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-white">Достижения</h2>
          <Badge variant="outline" className="text-xs font-medium">
            {completedAchievements}/{totalAchievements}
          </Badge>
        </div>
        <Progress value={achievementProgress} className="h-2" />
      </div>

      <div className="space-y-5">
        {Object.entries(categories).map(([category, categoryAchievements]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-md font-medium text-white/90 border-b border-white/10 pb-1">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="space-y-3">
              {categoryAchievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-2 rounded-lg ${achievement.completed 
                    ? 'bg-white/10' 
                    : 'bg-white/5'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {achievement.icon}
                      <span className="font-medium text-sm">
                        {achievement.title}
                      </span>
                    </div>
                    <Badge 
                      variant={achievement.completed ? "success" : "outline"} 
                      className="text-xs"
                    >
                      {achievement.currentValue}/{achievement.targetValue}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{achievement.description}</p>
                  <Progress 
                    value={(achievement.currentValue / achievement.targetValue) * 100} 
                    className="h-1" 
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
