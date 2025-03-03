
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { HardDrive } from 'lucide-react';

interface MiningProps {
  dollars: number;
  btc: number;
  onPurchaseRig: (cost: number) => void;
  knowledge: number;
}

const Mining: React.FC<MiningProps> = ({ dollars, btc, onPurchaseRig, knowledge }) => {
  const [hasBasicRig, setHasBasicRig] = useState(false);
  const [displayBtc, setDisplayBtc] = useState(btc);
  const basicRigCost = 500;
  const discountPercentage = Math.min(knowledge / 2, 25); // Max 25% discount based on knowledge
  const actualCost = Math.floor(basicRigCost * (1 - discountPercentage / 100));
  
  // Update display BTC when actual BTC changes
  useEffect(() => {
    setDisplayBtc(btc);
  }, [btc]);
  
  // Real-time mining simulation
  useEffect(() => {
    if (hasBasicRig) {
      const interval = setInterval(() => {
        // Increment at a rate of 0.00001 BTC per hour, but shown every 100ms
        const btcIncrement = 0.00001 / (36000); // per 100ms
        setDisplayBtc(prev => prev + btcIncrement);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [hasBasicRig]);
  
  const handlePurchaseRig = () => {
    if (dollars >= actualCost) {
      onPurchaseRig(actualCost);
      setHasBasicRig(true);
      toast({
        title: "Оборудование приобретено!",
        description: "Вы купили базовое оборудование для майнинга",
        duration: 3000
      });
    }
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <HardDrive size={20} />
        Майнинг
      </h2>
      <div className="space-y-4">
        {!hasBasicRig ? (
          <ActionButton
            onClick={handlePurchaseRig}
            disabled={dollars < actualCost}
            tooltip={dollars < actualCost ? `Нужно $${actualCost}` : "Купить оборудование для майнинга"}
            longPressTooltip="Майнинг позволяет пассивно добывать криптовалюту"
          >
            Купить базовое оборудование (${actualCost})
            {discountPercentage > 0 && (
              <span className="text-xs text-green-400 ml-1">-{discountPercentage}%</span>
            )}
          </ActionButton>
        ) : (
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white">Статус майнинга:</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Активен</span>
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Скорость майнинга: 0.00001 BTC/час
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white">Текущий баланс:</span>
              <span className="text-xs font-mono text-amber-400">{displayBtc.toFixed(8)} BTC</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mining;
