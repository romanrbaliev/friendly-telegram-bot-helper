
import React from 'react';
import ActionButton from './ActionButton';
import { toast } from '@/components/ui/use-toast';

interface MainActionsProps {
  dollars: number;
  usdt: number;
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStaking: () => void;
  showBuyCrypto: boolean;
  showStaking: boolean;
}

const MainActions: React.FC<MainActionsProps> = ({
  dollars,
  usdt,
  handleSaveDollar,
  handleBuyCrypto,
  handleStaking,
  showBuyCrypto,
  showStaking
}) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <ActionButton 
        onClick={handleSaveDollar}
        tooltip="Отложите $1 на инвестиции"
      >
        Отложить $1 на инвестиции
      </ActionButton>
      
      {showBuyCrypto && (
        <ActionButton 
          onClick={handleBuyCrypto}
          disabled={dollars < 10}
          tooltip={dollars < 10 ? `Нужно еще ${10 - dollars}$` : "Обменять все доллары на USDT"}
          longPressTooltip="Вы покупаете криптовалюту для инвестиций. При покупке списывается комиссия 5% от суммы."
          longPressTime={2000}
        >
          Купить криптовалюту (USDT)
        </ActionButton>
      )}
      
      {showStaking && (
        <ActionButton 
          onClick={handleStaking}
          disabled={usdt < 10}
          tooltip={usdt < 10 ? `Нужно еще ${10 - usdt} USDT` : "Разместить 10 USDT в стейкинге"}
          longPressTooltip="Стейкинг позволяет получать пассивный доход в размере ~10% годовых."
          longPressTime={2000}
        >
          Стейкинг USDT
        </ActionButton>
      )}
    </div>
  );
};

export default MainActions;
