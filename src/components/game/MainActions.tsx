
import React from 'react';
import ActionButton from './ActionButton';
import { DollarSign, GraduationCap, ArrowUpRight, Shield } from 'lucide-react';
import BuyUSDT from './BuyUSDT';
import HintPopup from './HintPopup';

interface MainActionsProps {
  dollars: number;
  usdt: number;
  showBuyCrypto: boolean;
  showBuyUsdt: boolean;
  showStaking: boolean;
  showEducation: boolean;
  handleSaveDollar: () => void;
  handleBuyCrypto: () => void;
  handleStaking: () => void;
  handleLearnBasics: () => void;
  handleBuyUsdt?: (amount: number) => void;
  knowledge: number;
  showHint?: boolean;
  hintInfo?: { title: string, description: string };
  onCloseHint?: (feature: string) => void;
  currentFeature?: string;
}

const MainActions: React.FC<MainActionsProps> = ({
  dollars, 
  usdt,
  showBuyCrypto,
  showBuyUsdt,
  showStaking,
  showEducation,
  handleSaveDollar,
  handleBuyCrypto,
  handleStaking,
  handleLearnBasics,
  handleBuyUsdt,
  knowledge,
  showHint,
  hintInfo = { title: '', description: '' },
  onCloseHint,
  currentFeature = ''
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in space-y-6">
      <div className="glass-morphism p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Основные действия</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ActionButton 
              onClick={handleSaveDollar}
              tooltip="Заработать $1 на аирдропах"
            >
              <div className="flex items-center justify-center gap-2">
                <DollarSign size={18} className="text-green-400" />
                <span>Заработать на аирдропах</span>
              </div>
            </ActionButton>
          </div>

          {showEducation && (
            <div>
              <ActionButton 
                onClick={handleLearnBasics}
                disabled={dollars < 10}
                tooltip={dollars < 10 ? "Недостаточно средств" : "Изучить основы криптовалют за $10"}
              >
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap size={18} className="text-blue-400" />
                  <span>Изучить основы криптовалют</span>
                </div>
              </ActionButton>
            </div>
          )}

          {showBuyCrypto && (
            <div>
              <ActionButton 
                onClick={handleBuyCrypto}
                disabled={dollars < 50}
                tooltip={dollars < 50 ? "Недостаточно средств" : "Купить первую криптовалюту за $50"}
              >
                <div className="flex items-center justify-center gap-2">
                  <ArrowUpRight size={18} className="text-orange-400" />
                  <span>Купить первую криптовалюту</span>
                </div>
              </ActionButton>
            </div>
          )}

          {showStaking && (
            <div>
              <ActionButton 
                onClick={handleStaking}
                disabled={dollars < 100}
                tooltip={dollars < 100 ? "Недостаточно средств" : "Активировать фоновый стейкинг за $100"}
              >
                <div className="flex items-center justify-center gap-2">
                  <Shield size={18} className="text-purple-400" />
                  <span>Фоновый стейкинг</span>
                </div>
              </ActionButton>
            </div>
          )}
        </div>
      </div>
      
      {showBuyUsdt && handleBuyUsdt && (
        <BuyUSDT 
          dollars={dollars} 
          onBuyUSDT={handleBuyUsdt}
          knowledge={knowledge}
        />
      )}
      
      {showHint && hintInfo && onCloseHint && (
        <HintPopup
          title={hintInfo.title}
          description={hintInfo.description}
          isOpen={showHint}
          onClose={() => onCloseHint(currentFeature)}
        />
      )}
    </div>
  );
};

export default MainActions;
