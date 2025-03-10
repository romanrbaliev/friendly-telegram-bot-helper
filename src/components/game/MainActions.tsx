
import React from 'react';
import ActionButton from './ActionButton';
import { DollarSign, BookOpen, Coins, ArrowUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface MainActionsProps {
  dollars: number;
  usdt: number;
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStaking: () => void;
  handleLearnBasics: () => void;
  showBuyCrypto: boolean;
  showStaking: boolean;
  showEducation: boolean;
  knowledge: number;
}

const MainActions: React.FC<MainActionsProps> = ({
  dollars,
  usdt,
  handleSaveDollar,
  handleBuyCrypto,
  handleStaking,
  handleLearnBasics,
  showBuyCrypto,
  showStaking,
  showEducation,
  knowledge
}) => {
  // Обработчик без toast уведомления
  const handleDollarClick = () => {
    console.log('Заработать на аирдропах - кнопка нажата');
    handleSaveDollar();
    
    // Убрано визуальное уведомление при каждом нажатии
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
  
  return (
    <div className="glass-morphism p-4 rounded-lg">
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
      </div>
    </div>
  );
};

export default MainActions;
