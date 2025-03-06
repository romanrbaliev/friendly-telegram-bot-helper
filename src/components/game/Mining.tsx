
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { HardDrive, Cpu, Thermometer, Server, Zap } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface MiningProps {
  dollars: number;
  btc: number;
  miningPower: number; // Add miningPower to props
  onPurchaseRig: (cost: number, powerIncrease: number) => void; // Modified to include power increase
  knowledge: number;
  marketMultiplier?: number;
}

interface MiningRig {
  id: string;
  name: string;
  cost: number;
  hashrate: number;
  energyConsumption: number;
  description: string;
  powerIncrease: number; // Add powerIncrease property
  icon: React.ReactNode;
}

const Mining: React.FC<MiningProps> = ({ 
  dollars, 
  btc, 
  miningPower, // Use miningPower from props
  onPurchaseRig, 
  knowledge,
  marketMultiplier = 1
}) => {
  const [hasBasicRig, setHasBasicRig] = useState(false);
  const [displayBtc, setDisplayBtc] = useState(btc);
  const [rigType, setRigType] = useState<string | null>(null);
  const [hashrate, setHashrate] = useState(0);
  const [efficiency, setEfficiency] = useState(100); // в процентах
  const [miningProgress, setMiningProgress] = useState(0);
  const [electricityCost, setElectricityCost] = useState(0);
  const [lastElectricityPayment, setLastElectricityPayment] = useState(Date.now());
  
  const rigs: MiningRig[] = [
    {
      id: "basic",
      name: "Базовое оборудование",
      cost: 500,
      hashrate: 10,
      energyConsumption: 300,
      powerIncrease: 1, // Add powerIncrease value
      description: "Начальная установка для майнинга на базе GPU",
      icon: <Cpu size={16} />
    },
    {
      id: "advanced",
      name: "Продвинутый риг",
      cost: 2000,
      hashrate: 50,
      energyConsumption: 800,
      powerIncrease: 5, // Add powerIncrease value
      description: "Мультикарточный GPU-риг с эффективным охлаждением",
      icon: <Thermometer size={16} />
    },
    {
      id: "asic",
      name: "ASIC-майнер",
      cost: 5000,
      hashrate: 200,
      energyConsumption: 1500,
      powerIncrease: 20, // Add powerIncrease value
      description: "Профессиональное оборудование для промышленного майнинга",
      icon: <Server size={16} />
    }
  ];
  
  // Расчет скидки на основе уровня знаний
  const calculateDiscount = (baseCost: number) => {
    const discountPercentage = Math.min(knowledge / 2, 25); // Максимум 25% скидки
    return Math.floor(baseCost * (1 - discountPercentage / 100));
  };
  
  // Update display BTC and check mining state on component mount
  useEffect(() => {
    setDisplayBtc(btc);
    // Update rig status based on existing mining power
    if (miningPower > 0 && !hasBasicRig) {
      setHasBasicRig(true);
      
      // Determine rig type based on mining power
      if (miningPower >= 20) {
        setRigType("asic");
        setHashrate(200);
      } else if (miningPower >= 5) {
        setRigType("advanced");
        setHashrate(50);
      } else {
        setRigType("basic");
        setHashrate(10);
      }
    }
  }, [btc, miningPower]);
  
  // Обработка электроэнергии - каждую минуту списывается плата
  useEffect(() => {
    if (hashrate > 0) {
      const currentRig = rigs.find(rig => rig.id === rigType);
      if (currentRig) {
        // Расчет стоимости электроэнергии (0.01 за 100 единиц потребления в час)
        const hourlyRate = currentRig.energyConsumption * 0.0001;
        
        // Проверка каждые 10 секунд
        const interval = setInterval(() => {
          const now = Date.now();
          // Если прошло более 60 секунд с последней оплаты
          if (now - lastElectricityPayment >= 60000) {
            // Оплата за минуту
            const cost = hourlyRate / 60;
            setElectricityCost(prev => prev + cost);
            setLastElectricityPayment(now);
            
            // Если накопилось больше 5$, показываем уведомление
            if (electricityCost >= 5) {
              toast({
                title: "Счет за электроэнергию",
                description: `Списано $${electricityCost.toFixed(2)} за питание майнингового оборудования`,
                duration: 3000
              });
              
              onPurchaseRig(electricityCost, 0); // Списываем стоимость без увеличения мощности
              setElectricityCost(0);
            }
          }
        }, 10000);
        
        return () => clearInterval(interval);
      }
    }
  }, [hashrate, rigType, lastElectricityPayment, electricityCost]);
  
  // Real-time mining simulation with progress bar
  useEffect(() => {
    if (hashrate > 0) {
      const interval = setInterval(() => {
        // Базовая скорость добычи
        // Учитываем хешрейт, эффективность, рыночный множитель
        const baseRate = (hashrate / 10) * 0.00001;
        const marketAdjustedRate = baseRate * (marketMultiplier || 1);
        const btcIncrement = marketAdjustedRate / (36000) * (efficiency / 100); // per 100ms
        
        setDisplayBtc(prev => prev + btcIncrement);
        
        // Update progress bar for visual feedback
        setMiningProgress(prev => {
          const newProgress = prev + 0.25; // Increment by 0.25% every 100ms
          return newProgress >= 100 ? 0 : newProgress;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [hashrate, efficiency, marketMultiplier]);
  
  const handlePurchaseRig = (rig: MiningRig) => {
    const actualCost = calculateDiscount(rig.cost);
    
    if (dollars >= actualCost) {
      // Pass both cost and power increase
      onPurchaseRig(actualCost, rig.powerIncrease);
      
      if (!hasBasicRig) {
        setHasBasicRig(true);
      }
      
      setRigType(rig.id);
      setHashrate(rig.hashrate);
      
      toast({
        title: "Оборудование приобретено!",
        description: `Вы купили ${rig.name} для майнинга`,
        duration: 3000
      });
    }
  };

  const optimizeEfficiency = () => {
    if (efficiency < 100 && dollars >= 100) {
      onPurchaseRig(100, 0); // No power increase for optimization
      const newEfficiency = Math.min(efficiency + 10, 100);
      setEfficiency(newEfficiency);
      
      toast({
        title: "Система охлаждения улучшена",
        description: `Эффективность майнинга повышена до ${newEfficiency}%`,
        duration: 3000
      });
    }
  };

  const getMiningSpeed = () => {
    // Рассчитываем скорость с учетом рыночного множителя
    const baseRate = (hashrate / 10) * 0.00001 * (efficiency / 100);
    const marketAdjustedRate = baseRate * (marketMultiplier || 1);
    return marketAdjustedRate.toFixed(8);
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <HardDrive size={20} />
        Майнинг
      </h2>
      <div className="space-y-4">
        {!hasBasicRig ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-300 mb-2">
              Майнинг позволяет пассивно добывать криптовалюту с помощью специализированного оборудования.
            </p>
            
            <div className="border border-gray-700 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-white flex items-center gap-1">
                  <Cpu size={16} />
                  Базовое оборудование
                </h3>
                <span className="text-xs font-mono text-amber-400">
                  ${calculateDiscount(500)}
                  {knowledge > 0 && <span className="text-xs text-green-400 ml-1">-{Math.min(knowledge / 2, 25)}%</span>}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Начальная установка для майнинга на базе GPU</p>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Хешрейт:</span>
                <span className="text-white">10 TH/s</span>
              </div>
              <div className="flex justify-between text-xs mb-3">
                <span className="text-gray-400">Потребление:</span>
                <span className="text-white">300 W</span>
              </div>
              <ActionButton
                onClick={() => handlePurchaseRig(rigs[0])}
                disabled={dollars < calculateDiscount(500)}
                tooltip={dollars < calculateDiscount(500) ? `Нужно $${calculateDiscount(500)}` : "Купить базовое оборудование для майнинга"}
                longPressTooltip="Майнинг позволяет пассивно добывать криптовалюту"
              >
                Купить базовое оборудование
              </ActionButton>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white">Статус майнинга:</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Активен</span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Прогресс добычи:</span>
                  <span>{miningProgress.toFixed(0)}%</span>
                </div>
                <Progress value={miningProgress} className="h-2" />
              </div>
              
              <div className="text-xs text-gray-400 mb-2">
                Скорость майнинга: {getMiningSpeed()} BTC/час
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white">Текущий баланс:</span>
                <span className="text-xs font-mono text-amber-400">{displayBtc.toFixed(8)} BTC</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white">Эффективность:</span>
                <span className="text-xs font-mono text-blue-400">{efficiency}%</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white flex items-center gap-1">
                  <Zap size={12} className="text-yellow-400" />
                  Счет за электричество:
                </span>
                <span className="text-xs font-mono text-yellow-400">${electricityCost.toFixed(2)}</span>
              </div>
              
              {efficiency < 100 && (
                <ActionButton
                  onClick={optimizeEfficiency}
                  disabled={dollars < 100}
                  tooltip={dollars < 100 ? "Нужно $100" : "Улучшить систему охлаждения (+10% к эффективности)"}
                >
                  Улучшить охлаждение ($100)
                </ActionButton>
              )}
            </div>
            
            {rigType && rigType !== "asic" && (
              <div className="border border-gray-700 rounded-md p-3">
                <h3 className="text-sm font-medium text-white mb-2">Улучшить оборудование</h3>
                
                {rigType === "basic" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Продвинутый риг:</span>
                      <span className="text-white">${calculateDiscount(2000)}</span>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400">Увеличение хешрейта:</span>
                      <span className="text-green-400">+40 TH/s</span>
                    </div>
                    <ActionButton
                      onClick={() => handlePurchaseRig(rigs[1])}
                      disabled={dollars < calculateDiscount(2000)}
                      tooltip={dollars < calculateDiscount(2000) ? `Нужно $${calculateDiscount(2000)}` : "Обновить до продвинутого рига"}
                    >
                      Купить продвинутый риг
                    </ActionButton>
                  </div>
                )}
                
                {rigType === "advanced" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">ASIC-майнер:</span>
                      <span className="text-white">${calculateDiscount(5000)}</span>
                    </div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-gray-400">Увеличение хешрейта:</span>
                      <span className="text-green-400">+150 TH/s</span>
                    </div>
                    <ActionButton
                      onClick={() => handlePurchaseRig(rigs[2])}
                      disabled={dollars < calculateDiscount(5000)}
                      tooltip={dollars < calculateDiscount(5000) ? `Нужно $${calculateDiscount(5000)}` : "Обновить до ASIC-майнера"}
                    >
                      Купить ASIC-майнер
                    </ActionButton>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mining;

