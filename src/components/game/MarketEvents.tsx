
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { TrendingUp, TrendingDown, BarChart4, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MarketEventsProps {
  knowledge: number;
  onPrepareForEvent: (cost: number) => void;
  onMarketChange: (multiplier: number) => void;
}

type MarketEvent = {
  id: string;
  name: string;
  description: string;
  duration: number; // в секундах
  impact: number; // множитель цены (0.5 = -50%, 1.5 = +50%)
  icon: React.ReactNode;
  color: string;
};

const MarketEvents: React.FC<MarketEventsProps> = ({ knowledge, onPrepareForEvent, onMarketChange }) => {
  const [currentEvent, setCurrentEvent] = useState<MarketEvent | null>(null);
  const [eventTimeRemaining, setEventTimeRemaining] = useState<number>(0);
  const [eventProgress, setEventProgress] = useState<number>(0);
  const [marketTrend, setMarketTrend] = useState<number>(1);
  const [volatility, setVolatility] = useState<number>(5); // Процентное изменение каждые 30 секунд
  const [nextEventTime, setNextEventTime] = useState<number>(60); // Секунды до следующего события
  const [preparedForEvent, setPreparedForEvent] = useState<boolean>(false);
  
  const marketEvents: MarketEvent[] = [
    {
      id: "bull_run",
      name: "Бычий рынок",
      description: "Резкий рост цен на все криптовалюты",
      duration: 120,
      impact: 1.5,
      icon: <TrendingUp size={18} />,
      color: "text-green-500"
    },
    {
      id: "bear_market",
      name: "Медвежий рынок",
      description: "Падение цен на криптовалюты",
      duration: 120,
      impact: 0.7,
      icon: <TrendingDown size={18} />,
      color: "text-red-500"
    },
    {
      id: "high_volatility",
      name: "Высокая волатильность",
      description: "Резкие колебания цен в обоих направлениях",
      duration: 90,
      impact: 1.2,
      icon: <BarChart4 size={18} />,
      color: "text-amber-500"
    },
    {
      id: "market_crash",
      name: "Крах рынка",
      description: "Критическое падение стоимости всех активов",
      duration: 60,
      impact: 0.5,
      icon: <AlertTriangle size={18} />,
      color: "text-red-600"
    }
  ];
  
  // Обновление рыночного тренда с регулярными колебаниями
  useEffect(() => {
    const interval = setInterval(() => {
      // Базовые небольшие колебания каждые 10 секунд (±5% по умолчанию)
      const randomChange = 1 + (Math.random() * volatility / 100) * (Math.random() > 0.5 ? 1 : -1);
      const newTrend = currentEvent 
        ? currentEvent.impact * randomChange 
        : marketTrend * randomChange;
      
      setMarketTrend(newTrend);
      onMarketChange(newTrend);
      
    }, 10000);
    
    return () => clearInterval(interval);
  }, [marketTrend, volatility, currentEvent, onMarketChange]);
  
  // Обратный отсчет до следующего события и управление ходом текущего события
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentEvent) {
        // Если идет событие, обновляем его таймер
        setEventTimeRemaining(prev => {
          const newTime = prev - 1;
          const progress = 100 - (newTime / currentEvent.duration * 100);
          setEventProgress(progress);
          
          if (newTime <= 0) {
            // Событие завершено
            toast({
              title: `${currentEvent.name} завершен`,
              description: "Рынок возвращается к нормальному состоянию",
              duration: 5000
            });
            setCurrentEvent(null);
            setPreparedForEvent(false);
            return 0;
          }
          return newTime;
        });
      } else {
        // Если нет события, обновляем таймер до следующего
        setNextEventTime(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            if (Math.random() < 0.7) { // 70% шанс события
              triggerRandomEvent();
            } else {
              // Если событие не произошло, установим новый таймер
              return Math.floor(120 + Math.random() * 180); // 2-5 минут
            }
          }
          return newTime;
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentEvent]);
  
  // Запуск случайного рыночного события
  const triggerRandomEvent = () => {
    const event = marketEvents[Math.floor(Math.random() * marketEvents.length)];
    
    // Применяем бонус за подготовку или знания
    let actualImpact = event.impact;
    let eventDuration = event.duration;
    
    if (preparedForEvent) {
      // Если игрок подготовился, сглаживаем негативные последствия на 30%
      if (actualImpact < 1) {
        actualImpact = actualImpact + (1 - actualImpact) * 0.3;
      }
      // И увеличиваем положительные на 20%
      else {
        actualImpact = actualImpact * 1.2;
      }
      setPreparedForEvent(false);
    }
    
    // Уровень знаний влияет на продолжительность негативных событий
    if (knowledge > 0 && actualImpact < 1) {
      const reductionPercent = Math.min(knowledge / 2, 30); // Максимум 30% сокращения
      eventDuration = Math.floor(event.duration * (1 - reductionPercent / 100));
    }
    
    // Создаем объект события с обновленными параметрами
    const modifiedEvent = {
      ...event,
      impact: actualImpact,
      duration: eventDuration
    };
    
    setCurrentEvent(modifiedEvent);
    setEventTimeRemaining(modifiedEvent.duration);
    setEventProgress(0);
    
    // Устанавливаем новый интервал для следующего события
    setNextEventTime(Math.floor(120 + Math.random() * 180)); // 2-5 минут
    
    toast({
      title: `${modifiedEvent.name} начался!`,
      description: modifiedEvent.description,
      duration: 5000
    });
  };
  
  // Подготовка к следующему событию
  const prepareForNextEvent = () => {
    if (!preparedForEvent) {
      onPrepareForEvent(200);
      setPreparedForEvent(true);
      
      toast({
        title: "Готовность к рыночным событиям",
        description: "Вы подготовились к следующему рыночному событию. Его негативное влияние будет меньше, а позитивное - сильнее.",
        duration: 3000
      });
    }
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <BarChart4 size={20} />
        Рыночные события
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Текущий тренд рынка:</span>
          <div className="flex items-center gap-2">
            {marketTrend > 1 ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <TrendingDown size={16} className="text-red-500" />
            )}
            <span className={`text-sm font-mono ${marketTrend > 1 ? 'text-green-500' : 'text-red-500'}`}>
              {marketTrend > 1 
                ? `+${((marketTrend - 1) * 100).toFixed(1)}%` 
                : `${((marketTrend - 1) * 100).toFixed(1)}%`}
            </span>
          </div>
        </div>
        
        {currentEvent ? (
          <div className="bg-gray-800/50 rounded-md p-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={`${currentEvent.color}`}>{currentEvent.icon}</span>
                <span className="text-sm font-medium text-white">{currentEvent.name}</span>
              </div>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                {eventTimeRemaining}с
              </span>
            </div>
            
            <p className="text-xs text-gray-400 mb-3">{currentEvent.description}</p>
            
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Прогресс:</span>
                <span>{eventProgress.toFixed(0)}%</span>
              </div>
              <Progress value={eventProgress} className="h-2" />
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Влияние на рынок:</span>
              <span className={currentEvent.impact >= 1 ? "text-green-500" : "text-red-500"}>
                {currentEvent.impact >= 1 
                  ? `+${((currentEvent.impact - 1) * 100).toFixed(0)}%` 
                  : `${((currentEvent.impact - 1) * 100).toFixed(0)}%`}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-md p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white">Следующее событие через:</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                {nextEventTime}с
              </span>
            </div>
            
            <p className="text-xs text-gray-400 mb-3">
              Рыночные события могут существенно повлиять на стоимость ваших активов. 
              Будьте готовы!
            </p>
            
            <ActionButton
              onClick={prepareForNextEvent}
              disabled={preparedForEvent || knowledge < 10}
              tooltip={
                preparedForEvent 
                  ? "Вы уже подготовились к следующему событию" 
                  : knowledge < 10 
                    ? "Требуется минимум 10% знаний" 
                    : "Подготовиться к следующему рыночному событию ($200)"
              }
            >
              Подготовиться к событию ($200)
            </ActionButton>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2">
          <p>Ваш уровень знаний ({knowledge}%) помогает лучше справляться с рыночными событиями.</p>
        </div>
      </div>
    </div>
  );
};

export default MarketEvents;
