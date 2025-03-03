
import React from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { Users, Briefcase, TrendingUp, HardDrive, UserCheck, BarChart2, RefreshCw } from 'lucide-react';

interface CareerProps {
  dollars: number;
  onSelectRole: (role: string) => void;
  selectedRole: string | null;
  knowledge: number;
}

interface RoleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  advantages: string[];
  minDollars: number;
  requiredKnowledge: number;
}

const Career: React.FC<CareerProps> = ({ dollars, onSelectRole, selectedRole, knowledge }) => {
  const roles: RoleOption[] = [
    {
      id: "investor",
      name: "Инвестор",
      description: "Пассивный доход через стейкинг и долгосрочные инвестиции",
      icon: <Briefcase size={16} />,
      advantages: ["Низкий риск", "Стабильный доход", "Пассивное накопление"],
      minDollars: 1000,
      requiredKnowledge: 5,
    },
    {
      id: "founder",
      name: "Фаундер",
      description: "Создание токенов и криптопроектов",
      icon: <Users size={16} />,
      advantages: ["Высокая потенциальная доходность", "Создание собственных токенов"],
      minDollars: 1500,
      requiredKnowledge: 30,
    },
    {
      id: "trader",
      name: "Трейдер",
      description: "Торговля с использованием волатильности рынка",
      icon: <TrendingUp size={16} />,
      advantages: ["Быстрая прибыль", "Использование рыночных колебаний"],
      minDollars: 1000,
      requiredKnowledge: 15,
    },
    {
      id: "miner",
      name: "Майнер",
      description: "Создание инфраструктуры для добычи криптовалют",
      icon: <HardDrive size={16} />,
      advantages: ["Стабильная добыча криптовалюты", "Масштабируемость"],
      minDollars: 3000,
      requiredKnowledge: 10,
    },
    {
      id: "influencer",
      name: "Инфлюенсер",
      description: "Привлечение подписчиков и создание контента",
      icon: <UserCheck size={16} />,
      advantages: ["Пассивный доход от аудитории", "Социальное влияние"],
      minDollars: 1000,
      requiredKnowledge: 5,
    },
    {
      id: "analyst",
      name: "Аналитик",
      description: "Создание и продажа прогнозов рынка",
      icon: <BarChart2 size={16} />,
      advantages: ["Высокая точность прогнозов", "Монетизация знаний"],
      minDollars: 1000,
      requiredKnowledge: 35,
    },
    {
      id: "arbitrage",
      name: "Арбитражник",
      description: "Использование разницы цен между платформами",
      icon: <RefreshCw size={16} />,
      advantages: ["Быстрая прибыль", "Низкая зависимость от рынка"],
      minDollars: 5000,
      requiredKnowledge: 25,
    }
  ];

  const handleSelectRole = (role: RoleOption) => {
    if (dollars >= role.minDollars && knowledge >= role.requiredKnowledge) {
      onSelectRole(role.id);
      toast({
        title: `Вы выбрали карьеру: ${role.name}`,
        description: "Теперь вам доступны новые возможности!",
        duration: 3000
      });
    }
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <Briefcase size={20} />
        Карьера
      </h2>
      
      {selectedRole ? (
        <div className="bg-blue-900/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-blue-300 mb-2">
            <Briefcase size={16} />
            <span>Ваша текущая специализация:</span>
          </div>
          <div className="font-semibold text-white">
            {roles.find(r => r.id === selectedRole)?.name}
          </div>
          <p className="text-xs text-gray-300 mt-1">
            {roles.find(r => r.id === selectedRole)?.description}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-300 mb-4">
          Выберите специализацию, чтобы получить уникальные возможности и бонусы
        </p>
      )}

      <div className="space-y-3">
        {roles.map(role => (
          <div 
            key={role.id} 
            className={`border rounded-md p-3 transition-all ${
              selectedRole === role.id 
                ? 'border-blue-500 bg-blue-900/20' 
                : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-white flex items-center gap-1">
                {role.icon}
                {role.name}
              </h3>
              {selectedRole === role.id && (
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Выбрано</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-2">{role.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {role.advantages.map((advantage, idx) => (
                <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">
                  {advantage}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col">
                {dollars < role.minDollars && (
                  <span className="text-xs text-amber-500">
                    Требуется: ${role.minDollars}
                  </span>
                )}
                {knowledge < role.requiredKnowledge && (
                  <span className="text-xs text-blue-400">
                    Требуемые знания: {role.requiredKnowledge}%
                  </span>
                )}
              </div>
              
              <ActionButton
                onClick={() => handleSelectRole(role)}
                disabled={dollars < role.minDollars || knowledge < role.requiredKnowledge || selectedRole === role.id}
                tooltip={
                  selectedRole === role.id 
                    ? "Уже выбрано" 
                    : dollars < role.minDollars 
                      ? `Необходимо $${role.minDollars}` 
                      : knowledge < role.requiredKnowledge 
                        ? `Необходимо ${role.requiredKnowledge}% знаний` 
                        : "Выбрать эту карьеру"
                }
              >
                {selectedRole === role.id ? "Выбрано" : "Выбрать"}
              </ActionButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;
