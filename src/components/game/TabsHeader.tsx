
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, GraduationCap, ArrowUpDown, HardDrive, Briefcase, BarChart4, Medal, TrendingUp, Shield } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface TabsHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  showTrading: boolean;
  showEducation: boolean;
  showMining: boolean;
  showCareer: boolean;
  showMarketEvents: boolean;
  miningPower: number;
  hasNewMarketEvent: boolean;
  miningAnimation?: boolean;
  marketMultiplier?: number;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
  activeTab,
  setActiveTab,
  showTrading,
  showEducation,
  showMining,
  showCareer,
  showMarketEvents,
  miningPower,
  hasNewMarketEvent,
  miningAnimation = false,
  marketMultiplier = 1
}) => {
  const isBullMarket = marketMultiplier > 1;
  
  return (
    <div className="w-full animate-fade-in flex flex-col gap-1">
      {/* Первый ряд вкладок */}
      <TabsList className="w-full mb-1 grid grid-cols-5">
        <TabsTrigger value="main" className="flex items-center justify-center gap-1">
          <DollarSign size={16} />
          <span>Основное</span>
        </TabsTrigger>
        
        {showTrading && (
          <TabsTrigger value="trading" className="flex items-center justify-center gap-1">
            <ArrowUpDown size={16} />
            <span>Трейдинг</span>
          </TabsTrigger>
        )}
        
        {showEducation && (
          <TabsTrigger value="education" className="flex items-center justify-center gap-1">
            <GraduationCap size={16} />
            <span>Обучение</span>
          </TabsTrigger>
        )}
        
        {showMining && (
          <TabsTrigger value="mining" className={`flex items-center justify-center gap-1 ${miningAnimation ? 'animate-pulse' : ''}`}>
            <HardDrive size={16} className={`${miningAnimation ? 'text-yellow-400' : ''}`} />
            <span>Майнинг</span>
            {miningPower > 0 && (
              <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-1 text-xs py-0 ${miningAnimation ? 'animate-pulse' : ''}`}>
                {miningPower}
              </Badge>
            )}
          </TabsTrigger>
        )}
        
        {showCareer && (
          <TabsTrigger value="career" className="flex items-center justify-center gap-1">
            <Briefcase size={16} />
            <span>Карьера</span>
          </TabsTrigger>
        )}
      </TabsList>
      
      {/* Второй ряд вкладок */}
      <TabsList className="w-full grid grid-cols-5">
        {showMarketEvents && (
          <TabsTrigger value="market" className={`flex items-center justify-center gap-1 relative ${isBullMarket ? 'animate-pulse' : ''}`}>
            {isBullMarket ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : (
              <BarChart4 size={16} />
            )}
            <span>
              {isBullMarket ? "Бычий рынок!" : "Рынок"}
            </span>
            {hasNewMarketEvent && !isBullMarket && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
            {isBullMarket && (
              <Badge variant="success" className="ml-1 text-xs py-0 animate-pulse">
                +{((marketMultiplier - 1) * 100).toFixed(0)}%
              </Badge>
            )}
          </TabsTrigger>
        )}
        
        <TabsTrigger value="staking" className="flex items-center justify-center gap-1">
          <Shield size={16} />
          <span>Стейкинг</span>
        </TabsTrigger>
        
        <TabsTrigger value="achievements" className="flex items-center justify-center gap-1">
          <Medal size={16} />
          <span>Ачивки</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TabsHeader;
