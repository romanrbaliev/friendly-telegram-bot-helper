
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import { DollarSign, BookOpen, Coins, ArrowUp, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

interface MainActionsProps {
  dollars: number;
  usdt?: number; // Необязательный параметр
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStaking: () => void;
  handleLearnBasics: () => void;
  showBuyCrypto: boolean;
  showStaking: boolean;
  showEducation?: boolean; // Необязательный параметр
  knowledge: number;
}

const MainActions: React.FC<MainActionsProps> = ({
  dollars,
  usdt = 0, // Значение по умолчанию
  handleSaveDollar,
  handleBuyCrypto,
  handleStaking,
  handleLearnBasics,
  showBuyCrypto,
  showStaking,
  showEducation = false, // Значение по умолчанию
  knowledge
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [showClickEffect, setShowClickEffect] = useState(false);
  
  // Обработчик с визуальным эффектом и счетчиком
  const handleDollarClick = () => {
    console.log('Заработать на аирдропах - кнопка нажата');
    handleSaveDollar();
    
    // Увеличиваем счетчик кликов для достижений
    setClickCount(prev => prev + 1);
    
    // Активируем эффект клика
    setShowClickEffect(true);
    setTimeout(() => setShowClickEffect(false), 300);
    
    // Показываем уведомление при достижении определенных вех
    if (clickCount + 1 === 10) {
      toast({
        title: "Достижение разблокировано!",
        description: "Вы сделали 10 кликов! Продолжайте в том же духе!",
      });
    } else if (clickCount + 1 === 50) {
      toast({
        title: "Достижение разблокировано!",
        description: "50 кликов! Вы на пути к успеху в крипто мире!",
      });
    } else if (clickCount + 1 === 100) {
      toast({
        title: "Достижение разблокировано!",
        description: "100 кликов! Вы настоящий крипто энтузиаст!",
      });
    }
  };
  
  // Обработчики для других кнопок с добавлением логов для отладки
  const handleCryptoButtonClick = () => {
    console.log('Купить криптовалюту - кнопка нажата');
    handleBuyCrypto();
  };
  
  const handleStakingButtonClick = () => {
    console.log('Стейкинг - кнопка нажата');
    handleStaking();
  };
  
  const handleLearnButtonClick = () => {
    console.log('Изучить основы - кнопка нажата');
    handleLearnBasics();
  };
  
  // Функция для отображения прогресса к следующей вехе
  const getProgressToNextMilestone = () => {
    if (clickCount < 10) return (clickCount / 10) * 100;
    if (clickCount < 50) return ((clickCount - 10) / 40) * 100;
    if (clickCount < 100) return ((clickCount - 50) / 50) * 100;
    return 100;
  };
  
  // Получение текста следующего достижения
  const getNextMilestoneText = () => {
    if (clickCount < 10) return `${clickCount}/10 кликов до первого достижения`;
    if (clickCount < 50) return `${clickCount}/50 кликов до второго достижения`;
    if (clickCount < 100) return `${clickCount}/100 кликов до третьего достижения`;
    return `${clickCount} кликов (все достижения получены!)`;
  };
  
  return (
    <div className="glass-morphism p-4 rounded-lg relative overflow-hidden">
      {showClickEffect && (
        <div className="absolute inset-0 bg-green-500/10 animate-pulse rounded-lg"></div>
      )}
      
      <h2 className="text-lg font-semibold mb-4 text-white">Основные действия</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <ActionButton
          onClick={handleDollarClick}
          tooltip="Получить $1"
          longPressTooltip="Зарабатывайте деньги на аирдропах криптовалют"
          longPressTime={1000}
        >
          <div className="flex items-center justify-center gap-2">
            <DollarSign className="text-green-400" />
            <span>Заработать на аирдропах</span>
          </div>
        </ActionButton>
        
        {clickCount > 0 && (
          <div className="bg-gray-800/50 p-2 rounded-lg mb-2">
            <div className="flex justify-between text-xs text-gray-300 mb-1">
              <span>Прогресс достижений:</span>
              <span>{getNextMilestoneText()}</span>
            </div>
            <Progress value={getProgressToNextMilestone()} className="h-2" />
          </div>
        )}
        
        {showEducation && (
          <ActionButton
            onClick={handleLearnButtonClick}
            disabled={dollars < 10}
            tooltip={dollars < 10 ? `Требуется $10` : "Изучить основы криптовалют"}
            longPressTooltip="Узнайте базовые принципы работы блокчейна и криптовалют"
            longPressTime={1000}
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="text-blue-400" />
              <span>Изучить основы криптовалют</span>
              <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">$10</span>
            </div>
          </ActionButton>
        )}
        
        {showBuyCrypto && (
          <ActionButton
            onClick={handleCryptoButtonClick}
            disabled={dollars < 50}
            tooltip={dollars < 50 ? `Нужно $50` : "Купить первую криптовалюту"}
            longPressTooltip="Войдите в мир криптовалют с первой инвестицией"
            longPressTime={1000}
          >
            <div className="flex items-center justify-center gap-2">
              <Coins className="text-amber-400" />
              <span>Купить первую криптовалюту</span>
              <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">$50</span>
            </div>
          </ActionButton>
        )}
        
        {showStaking && (
          <ActionButton
            onClick={handleStakingButtonClick}
            disabled={dollars < 100}
            tooltip={dollars < 100 ? `Требуется $100` : "Активировать фоновый стейкинг"}
            longPressTooltip="Начните зарабатывать даже когда вы не в игре"
            longPressTime={1000}
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowUp className="text-green-400" />
              <span>Фоновый стейкинг</span>
              <span className="text-xs bg-green-500/20 px-2 py-0.5 rounded text-green-300">$100</span>
            </div>
          </ActionButton>
        )}
        
        {usdt > 0 && dollars >= 200 && (
          <ActionButton
            onClick={() => toast({
              title: "В разработке",
              description: "Эта функция будет доступна в следующем обновлении!"
            })}
            tooltip="Попробовать автоматизированный трейдинг"
            longPressTooltip="Автоматизируйте свою торговлю с помощью торговых ботов"
            longPressTime={1000}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="text-purple-400" />
              <span>Автоматический трейдинг</span>
              <span className="text-xs bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">Скоро</span>
            </div>
          </ActionButton>
        )}
      </div>
    </div>
  );
};

export default MainActions;
