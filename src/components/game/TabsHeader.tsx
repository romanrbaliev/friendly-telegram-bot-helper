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
    <div className="flex-grow animate-fade-in w-full">
      <TabsList className="grid grid-cols-2 gap-1 w-full">
        <TabsTrigger value="main" className="flex items-center justify-start gap-1 p-1 text-xs h-8">
          <DollarSign size={12} />
          <span className="text-xs">Основное</span>
        </TabsTrigger>
        
        {showTrading && (
          <TabsTrigger value="trading" className="flex items-center justify-start gap-1 p-1 text-xs h-8">
            <ArrowUpDown size={12} />
            <span className="text-xs">Трейдинг</span>
          </TabsTrigger>
        )}
        
        {showEducation && (
          <TabsTrigger value="education" className="flex items-center justify-start gap-1 p-1 text-xs h-8">
            <GraduationCap size={12} />
            <span className="text-xs">Обучение</span>
          </TabsTrigger>
        )}
        
        {showMining && (
          <TabsTrigger value="mining" className={`flex items-center justify-start gap-1 p-1 text-xs h-8 ${miningAnimation ? 'animate-pulse' : ''}`}>
            <HardDrive size={12} className={`${miningAnimation ? 'text-yellow-400' : ''}`} />
            <span className="text-xs">Майнинг</span>
            {miningPower > 0 && (
              <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-auto text-xs py-0 px-1 ${miningAnimation ? 'animate-pulse' : ''}`}>
                {miningPower}
              </Badge>
            )}
          </TabsTrigger>
        )}
        
        {showCareer && (
          <TabsTrigger value="career" className="flex items-center justify-start gap-1 p-1 text-xs h-8">
            <Briefcase size={12} />
            <span className="text-xs">Карьера</span>
          </TabsTrigger>
        )}
        
        {showMarketEvents && (
          <TabsTrigger value="market" className={`flex items-center justify-start gap-1 p-1 text-xs h-8 relative ${isBullMarket ? 'animate-pulse' : ''}`}>
            {isBullMarket ? (
              <TrendingUp size={12} className="text-green-500" />
            ) : (
              <BarChart4 size={12} />
            )}
            <span className="text-xs">
              {isBullMarket ? "Бычий рынок!" : "Рынок"}
            </span>
            {hasNewMarketEvent && !isBullMarket && (
              <span className="absolute top-1 left-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
            {isBullMarket && (
              <Badge variant="success" className="ml-auto text-xs py-0 px-1 animate-pulse">
                +{((marketMultiplier - 1) * 100).toFixed(0)}%
              </Badge>
            )}
          </TabsTrigger>
        )}
        
        <TabsTrigger value="staking" className="flex items-center justify-start gap-1 p-1 text-xs h-8">
          <Shield size={12} />
          <span className="text-xs">Стейкинг</span>
        </TabsTrigger>
        
        <TabsTrigger value="achievements" className="flex items-center justify-start gap-1 p-1 text-xs h-8">
          <Medal size={12} />
          <span className="text-xs">Ачивки</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TabsHeader;
