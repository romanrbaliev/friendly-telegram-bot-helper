
import React, { useState, useEffect } from 'react';
import { DollarSign, GraduationCap, Briefcase } from 'lucide-react';

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
        // Calculate incremental values based on 10% APY on staked USDT
        // This assumes a 10% yearly return, calculated for 100ms
        if (stakedUsdt > 0) {
          const usdtIncrement = stakedUsdt * 0.1 / (365 * 24 * 36000); // 10% yearly return per 100ms
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
  }, [dollars, usdt, btc, stakedUsdt]);

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

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2">
        Ресурсы
      </h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-green-400" />
            <span className="text-gray-200">Наличные:</span>
          </div>
          <span className="font-mono text-white">${displayDollars.toFixed(2)}</span>
        </div>
        
        {showUsdt && (
          <div className="flex items-center justify-between animate-fade-up">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-[10px] font-bold text-white">₮</div>
              <span className="text-gray-200">USDT:</span>
            </div>
            <span className="font-mono text-white">{displayUsdt.toFixed(2)}</span>
          </div>
        )}
        
        {showBtc && (
          <div className="flex items-center justify-between animate-fade-up">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center text-[10px] font-bold text-white">₿</div>
              <span className="text-gray-200">Bitcoin:</span>
            </div>
            <span className="font-mono text-white">{displayBtc.toFixed(8)}</span>
          </div>
        )}
        
        {showStaking && (
          <div className="flex items-center justify-between animate-fade-up">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-[10px] font-bold text-white">₮</div>
              <span className="text-gray-200">Стейкинг:</span>
            </div>
            <span className="font-mono text-white">{displayStakedUsdt.toFixed(2)}</span>
          </div>
        )}

        {showKnowledge && (
          <div className="flex items-center justify-between animate-fade-up">
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-400" />
              <span className="text-gray-200">Знания:</span>
            </div>
            <span className="font-mono text-white">{knowledge}%</span>
          </div>
        )}

        {role && (
          <div className="flex items-center justify-between animate-fade-up mt-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-purple-400" />
              <span className="text-gray-200">Карьера:</span>
            </div>
            <span className="font-mono text-white">{getRoleName(role)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDisplay;
