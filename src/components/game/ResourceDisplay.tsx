
import React from 'react';
import { DollarSign } from 'lucide-react';

interface ResourceDisplayProps {
  dollars: number;
  usdt: number;
  showUsdt: boolean;
  stakedUsdt: number;
  showStaking: boolean;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ 
  dollars, 
  usdt, 
  showUsdt, 
  stakedUsdt, 
  showStaking 
}) => {
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
          <span className="font-mono text-white">${dollars.toFixed(2)}</span>
        </div>
        
        {showUsdt && (
          <div className="flex items-center justify-between animate-fade-up">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-[10px] font-bold text-white">₮</div>
              <span className="text-gray-200">USDT:</span>
            </div>
            <span className="font-mono text-white">{usdt.toFixed(2)}</span>
          </div>
        )}
        
        {showStaking && (
          <div className="flex items-center justify-between animate-fade-up">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-[10px] font-bold text-white">₮</div>
              <span className="text-gray-200">Стейкинг:</span>
            </div>
            <span className="font-mono text-white">{stakedUsdt.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDisplay;
