
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
    <div className="flex-grow animate-fade-in">
      <div className="flex flex-col space-y-1">
        <TabsList className="flex flex-wrap justify-start gap-1">
          <TabsTrigger value="main" className="flex items-center justify-center gap-1 px-2 py-1 text-xs">
            <DollarSign size={14} />
            <span>Основное</span>
          </TabsTrigger>
          
          {showTrading && (
            <TabsTrigger value="trading" className="flex items-center justify-center gap-1 px-2 py-1 text-xs">
              <ArrowUpDown size={14} />
              <span>Трейдинг</span>
            </TabsTrigger>
          )}
          
          {showEducation && (
            <TabsTrigger value="education" className="flex items-center justify-center gap-1 px-2 py-1 text-xs">
              <GraduationCap size={14} />
              <span>Обучение</span>
            </TabsTrigger>
          )}
          
          {showMining && (
            <TabsTrigger value="mining" className={`flex items-center justify-center gap-1 px-2 py-1 text-xs ${miningAnimation ? 'animate-pulse' : ''}`}>
              <HardDrive size={14} className={`${miningAnimation ? 'text-yellow-400' : ''}`} />
              <span>Майнинг</span>
              {miningPower > 0 && (
                <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-1 text-xs py-0 ${miningAnimation ? 'animate-pulse' : ''}`}>
                  {miningPower}
                </Badge>
              )}
            </TabsTrigger>
          )}
          
          {showCareer && (
            <TabsTrigger value="career" className="flex items-center justify-center gap-1 px-2 py-1 text-xs">
              <Briefcase size={14} />
              <span>Карьера</span>
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsList className="flex flex-wrap justify-start gap-1">
          {showMarketEvents && (
            <TabsTrigger value="market" className={`flex items-center justify-center gap-1 px-2 py-1 text-xs relative ${isBullMarket ? 'animate-pulse' : ''}`}>
              {isBullMarket ? (
                <TrendingUp size={14} className="text-green-500" />
              ) : (
                <BarChart4 size={14} />
              )}
              <span>
                {isBullMarket ? "Бычий рынок!" : "Рынок"}
              </span>
              {hasNewMarketEvent && !isBullMarket && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
              {isBullMarket && (
                <Badge variant="success" className="ml-1 text-xs py-0 animate-pulse">
                  +{((marketMultiplier - 1) * 100).toFixed(0)}%
                </Badge>
              )}
            </TabsTrigger>
          )}
          
          <TabsTrigger value="staking" className="flex items-center justify-center gap-1 px-2 py-1 text-xs">
            <Shield size={14} />
            <span>Стейкинг</span>
          </TabsTrigger>
          
          <TabsTrigger value="achievements" className="flex items-center justify-center gap-1 px-2 py-1 text-xs">
            <Medal size={14} />
            <span>Ачивки</span>
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default TabsHeader;
