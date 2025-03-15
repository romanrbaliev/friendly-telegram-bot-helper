
import React, { useState, useEffect } from 'react';
import { DollarSign, GraduationCap, Briefcase, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ResourceDisplayProps {
  dollars: number;
  usdt: number;
  showUsdt: boolean;
  stakedUsdt: number;
  showStaking: boolean;
  knowledge: number;
  showKnowledge: boolean;
  btc: number;
  showBtc: boolean;
  role?: string | null;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ 
  dollars, 
  usdt, 
  showUsdt, 
  stakedUsdt, 
  showStaking,
  knowledge,
  showKnowledge,
  btc,
  showBtc,
  role
}) => {
  // State for real-time resource display
  const [displayDollars, setDisplayDollars] = useState(dollars);
  const [displayUsdt, setDisplayUsdt] = useState(usdt);
  const [displayBtc, setDisplayBtc] = useState(btc);
  const [displayStakedUsdt, setDisplayStakedUsdt] = useState(stakedUsdt);
  
  // Real-time updates for resources
  useEffect(() => {
    // Update base values when props change
    setDisplayDollars(dollars);
    setDisplayUsdt(usdt);
    setDisplayBtc(btc);
    setDisplayStakedUsdt(stakedUsdt);
    
    // Only set up interval if we have staked USDT or mining power
    if (stakedUsdt > 0 || btc > 0) {
      const interval = setInterval(() => {
        // Рассчитываем годовую доходность
        const baseApy = 10; // 10% годовых
        const roleBonus = role === 'investor' ? 10 : 0; // +10% для инвесторов
        const totalApy = baseApy + roleBonus;
        
        // Calculate incremental values based on APY on staked USDT
        // This assumes the defined yearly return, calculated for 100ms
        if (stakedUsdt > 0) {
          const usdtIncrement = stakedUsdt * totalApy / (365 * 24 * 36000); // APY yearly return per 100ms
          setDisplayUsdt(prev => prev + usdtIncrement);
          
          // Also animate the staked USDT with a minimal visual increment
          const stakedIncrement = stakedUsdt * 0.001 / (365 * 24 * 36000); // Visual increment
          setDisplayStakedUsdt(prev => prev + stakedIncrement);
        }
        
        // If we have btc, update that too (assuming mining updates)
        if (btc > 0) {
          const btcIncrement = 0.00000001; // Very small increment for visual purposes
          setDisplayBtc(prev => prev + btcIncrement);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [dollars, usdt, btc, stakedUsdt, role]);

  const getRoleName = (roleId: string | null): string => {
    if (!roleId) return "";
    
    const roles: {[key: string]: string} = {
      "investor": "Инвестор",
      "founder": "Фаундер",
      "trader": "Трейдер",
      "miner": "Майнер",
      "influencer": "Инфлюенсер",
      "analyst": "Аналитик",
      "arbitrage": "Арбитражник"
    };
    
    return roles[roleId] || "";
  };

  // Информация о ресурсах для попаперов
  const resourceInfo = {
    dollars: {
      title: "Наличные",
      description: "Базовая валюта, получаемая за клики и используемая для начальных инвестиций.",
      source: "Получение: клики, продажа активов",
      usage: "Использование: покупка USDT, обучение, инвестиции"
    },
    usdt: {
      title: "USDT (Tether)",
      description: "Стейблкоин, привязанный к доллару США. Используется для более стабильных инвестиций.",
      source: "Получение: покупка за наличные, доход от стейкинга",
      usage: "Использование: стейкинг, торговля криптовалютами",
      bonuses: role === 'investor' ? "Бонус роли: +10% к доходу от стейкинга" : ""
    },
    btc: {
      title: "Bitcoin (BTC)",
      description: "Первая и самая известная криптовалюта. Имеет высокую волатильность.",
      source: "Получение: майнинг, торговля",
      usage: "Использование: продажа за USDT, инвестиции",
      marketState: "Может быть подвержен влиянию рыночных событий"
    },
    staking: {
      title: "Стейкинг USDT",
      description: "USDT, вложенные в стейкинг для получения пассивного дохода.",
      income: `Базовая доходность: 10% годовых${role === 'investor' ? '\nБонус роли: +10% годовых' : ''}`,
      total: `Текущая доходность: ${10 + (role === 'investor' ? 10 : 0)}% годовых`
    },
    knowledge: {
      title: "Знания",
      description: "Ваш уровень понимания криптовалют и блокчейна.",
      bonuses: "Знания улучшают множество аспектов игры:",
      details: "- Снижение комиссий при покупке USDT\n- Увеличение эффективности майнинга\n- Разблокировка новых возможностей\n- Улучшение доходности от кликов"
    },
    role: {
      title: "Карьера",
      description: role ? `Ваша текущая роль: ${getRoleName(role)}` : "Вы еще не выбрали специализацию",
      bonuses: role === 'investor' ? "Бонусы инвестора: +10% к доходности стейкинга" : 
               role === 'miner' ? "Бонусы майнера: +15% к эффективности майнинга" : 
               role === 'trader' ? "Бонусы трейдера: -20% к комиссиям при торговле" : 
               "Выберите специализацию, чтобы получить бонусы"
    }
  };

  return (
    <TooltipProvider>
      <div className="glass-morphism p-1.5 rounded-lg animate-fade-in sticky top-0 z-10 text-[10px]">
        <h2 className="text-xs font-semibold mb-0.5 text-white border-b border-white/10 pb-0.5">
          Ресурсы
        </h2>
        <div className="space-y-0.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <DollarSign size={10} className="text-green-400" />
              <span className="text-gray-200">Наличные:</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-white">${displayDollars.toFixed(2)}</span>
              <Popover>
                <PopoverTrigger>
                  <HelpCircle size={10} className="text-gray-400 hover:text-white cursor-help transition-colors" />
                </PopoverTrigger>
                <PopoverContent className="bg-gray-800 border border-gray-700 text-white text-xs p-3 w-64 shadow-xl">
                  <h3 className="font-bold text-green-400 mb-1">{resourceInfo.dollars.title}</h3>
                  <p className="text-gray-300 mb-2 text-[10px]">{resourceInfo.dollars.description}</p>
                  <div className="space-y-1">
                    <p className="text-[10px]"><span className="font-semibold text-gray-200">🔹 {resourceInfo.dollars.source}</span></p>
                    <p className="text-[10px]"><span className="font-semibold text-gray-200">🔸 {resourceInfo.dollars.usage}</span></p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {showUsdt && (
            <div className="flex items-center justify-between animate-fade-up">
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-3 rounded-full bg-[#26A17B] flex items-center justify-center text-[6px] font-bold text-white">₮</div>
                <span className="text-gray-200">USDT:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-white">{displayUsdt.toFixed(8)}</span>
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle size={10} className="text-gray-400 hover:text-white cursor-help transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border border-gray-700 text-white text-xs p-3 w-64 shadow-xl">
                    <h3 className="font-bold text-green-400 mb-1">{resourceInfo.usdt.title}</h3>
                    <p className="text-gray-300 mb-2 text-[10px]">{resourceInfo.usdt.description}</p>
                    <div className="space-y-1">
                      <p className="text-[10px]"><span className="font-semibold text-gray-200">🔹 {resourceInfo.usdt.source}</span></p>
                      <p className="text-[10px]"><span className="font-semibold text-gray-200">🔸 {resourceInfo.usdt.usage}</span></p>
                      {resourceInfo.usdt.bonuses && (
                        <p className="text-[10px]"><span className="font-semibold text-yellow-400">✨ {resourceInfo.usdt.bonuses}</span></p>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          
          {showBtc && (
            <div className="flex items-center justify-between animate-fade-up">
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-3 rounded-full bg-[#F7931A] flex items-center justify-center text-[6px] font-bold text-white">₿</div>
                <span className="text-gray-200">Bitcoin:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-white">{displayBtc.toFixed(8)}</span>
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle size={10} className="text-gray-400 hover:text-white cursor-help transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border border-gray-700 text-white text-xs p-3 w-64 shadow-xl">
                    <h3 className="font-bold text-yellow-500 mb-1">{resourceInfo.btc.title}</h3>
                    <p className="text-gray-300 mb-2 text-[10px]">{resourceInfo.btc.description}</p>
                    <div className="space-y-1">
                      <p className="text-[10px]"><span className="font-semibold text-gray-200">🔹 {resourceInfo.btc.source}</span></p>
                      <p className="text-[10px]"><span className="font-semibold text-gray-200">🔸 {resourceInfo.btc.usage}</span></p>
                      <p className="text-[10px]"><span className="font-semibold text-blue-400">📊 {resourceInfo.btc.marketState}</span></p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          
          {showStaking && (
            <div className="flex items-center justify-between animate-fade-up">
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-3 rounded-full bg-[#26A17B] flex items-center justify-center text-[6px] font-bold text-white">₮</div>
                <span className="text-gray-200">Стейкинг:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-white">{displayStakedUsdt.toFixed(8)}</span>
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle size={10} className="text-gray-400 hover:text-white cursor-help transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border border-gray-700 text-white text-xs p-3 w-64 shadow-xl">
                    <h3 className="font-bold text-green-400 mb-1">{resourceInfo.staking.title}</h3>
                    <p className="text-gray-300 mb-2 text-[10px]">{resourceInfo.staking.description}</p>
                    <div className="space-y-1">
                      <p className="text-[10px] whitespace-pre-line"><span className="font-semibold text-gray-200">{resourceInfo.staking.income}</span></p>
                      <p className="text-[10px]"><span className="font-semibold text-yellow-400">{resourceInfo.staking.total}</span></p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {showKnowledge && (
            <div className="flex items-center justify-between animate-fade-up">
              <div className="flex items-center gap-0.5">
                <GraduationCap size={10} className="text-blue-400" />
                <span className="text-gray-200">Знания:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-white">{knowledge}%</span>
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle size={10} className="text-gray-400 hover:text-white cursor-help transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border border-gray-700 text-white text-xs p-3 w-64 shadow-xl">
                    <h3 className="font-bold text-blue-400 mb-1">{resourceInfo.knowledge.title}</h3>
                    <p className="text-gray-300 mb-2 text-[10px]">{resourceInfo.knowledge.description}</p>
                    <div className="space-y-1">
                      <p className="text-[10px]"><span className="font-semibold text-gray-200">{resourceInfo.knowledge.bonuses}</span></p>
                      <p className="text-[10px] whitespace-pre-line"><span className="font-semibold text-blue-300">{resourceInfo.knowledge.details}</span></p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {role && (
            <div className="flex items-center justify-between animate-fade-up mt-0.5 pt-0.5 border-t border-white/10">
              <div className="flex items-center gap-0.5">
                <Briefcase size={10} className="text-purple-400" />
                <span className="text-gray-200">Карьера:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-white">{getRoleName(role)}</span>
                <Popover>
                  <PopoverTrigger>
                    <HelpCircle size={10} className="text-gray-400 hover:text-white cursor-help transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border border-gray-700 text-white text-xs p-3 w-64 shadow-xl">
                    <h3 className="font-bold text-purple-400 mb-1">{resourceInfo.role.title}</h3>
                    <p className="text-gray-300 mb-2 text-[10px]">{resourceInfo.role.description}</p>
                    <div className="space-y-1">
                      <p className="text-[10px]"><span className="font-semibold text-yellow-400">{resourceInfo.role.bonuses}</span></p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ResourceDisplay;
