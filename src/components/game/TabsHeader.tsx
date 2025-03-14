
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
  // Вместо единого ряда вкладок, разделим их на два ряда
  const isBullMarket = marketMultiplier > 1;
  
  return (
    <div className="w-full animate-fade-in">
      {/* Первый ряд вкладок */}
      <TabsList className="w-full mb-1 grid grid-cols-4">
        <TabsTrigger value="main" className="flex items-center gap-1">
          <DollarSign size={14} className="sm:size-16" />
          <span className="hidden sm:inline">Основное</span>
        </TabsTrigger>
        
        {showTrading && (
          <TabsTrigger value="trading" className="flex items-center gap-1">
            <ArrowUpDown size={14} className="sm:size-16" />
            <span className="hidden sm:inline">Трейдинг</span>
          </TabsTrigger>
        )}
        
        {showEducation && (
          <TabsTrigger value="education" className="flex items-center gap-1">
            <GraduationCap size={14} className="sm:size-16" />
            <span className="hidden sm:inline">Обучение</span>
          </TabsTrigger>
        )}
        
        {showMining && (
          <TabsTrigger value="mining" className={`flex items-center gap-1 ${miningAnimation ? 'animate-pulse' : ''}`}>
            <HardDrive size={14} className={`sm:size-16 ${miningAnimation ? 'text-yellow-400' : ''}`} />
            <span className="hidden sm:inline">Майнинг</span>
            {miningPower > 0 && (
              <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-1 text-xs py-0 ${miningAnimation ? 'animate-pulse' : ''}`}>
                {miningPower}
              </Badge>
            )}
          </TabsTrigger>
        )}
      </TabsList>
      
      {/* Второй ряд вкладок */}
      <TabsList className="w-full grid grid-cols-4">
        {showCareer && (
          <TabsTrigger value="career" className="flex items-center gap-1">
            <Briefcase size={14} className="sm:size-16" />
            <span className="hidden sm:inline">Карьера</span>
          </TabsTrigger>
        )}
        
        {showMarketEvents && (
          <TabsTrigger value="market" className={`flex items-center gap-1 relative ${isBullMarket ? 'animate-pulse' : ''}`}>
            {isBullMarket ? (
              <TrendingUp size={14} className="sm:size-16 text-green-500" />
            ) : (
              <BarChart4 size={14} className="sm:size-16" />
            )}
            <span className="hidden sm:inline">
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
        
        <TabsTrigger value="staking" className="flex items-center gap-1">
          <Shield size={14} className="sm:size-16" />
          <span className="hidden sm:inline">Стейкинг</span>
        </TabsTrigger>
        
        <TabsTrigger value="achievements" className="flex items-center gap-1">
          <Medal size={14} className="sm:size-16" />
          <span className="hidden sm:inline">Ачивки</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TabsHeader;
