
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, GraduationCap, ArrowUpDown, HardDrive, Briefcase, BarChart4, Medal } from 'lucide-react';
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
  hasNewMarketEvent
}) => {
  const visibleTabsCount = 1 + 
    (showTrading ? 1 : 0) + 
    (showEducation ? 1 : 0) + 
    (showMining ? 1 : 0) + 
    (showCareer ? 1 : 0) + 
    (showMarketEvents ? 1 : 0) + 
    1;
  
  return (
    <TabsList className="w-full animate-fade-in" style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(${visibleTabsCount}, minmax(0, 1fr))` 
    }}>
      <TabsTrigger value="main" className="flex items-center gap-1">
        <DollarSign size={14} className="sm:size-16" />
        <span className="sm:inline">Основное</span>
      </TabsTrigger>
      {showTrading && (
        <TabsTrigger value="trading" className="flex items-center gap-1">
          <ArrowUpDown size={14} className="sm:size-16" />
          <span className="sm:inline">Трейдинг</span>
        </TabsTrigger>
      )}
      {showEducation && (
        <TabsTrigger value="education" className="flex items-center gap-1">
          <GraduationCap size={14} className="sm:size-16" />
          <span className="sm:inline">Обучение</span>
        </TabsTrigger>
      )}
      {showMining && (
        <TabsTrigger value="mining" className="flex items-center gap-1">
          <HardDrive size={14} className="sm:size-16" />
          <span className="sm:inline">Майнинг</span>
          {miningPower > 0 && (
            <Badge variant="outline" className="ml-1 text-xs py-0">
              {miningPower}
            </Badge>
          )}
        </TabsTrigger>
      )}
      {showCareer && (
        <TabsTrigger value="career" className="flex items-center gap-1">
          <Briefcase size={14} className="sm:size-16" />
          <span className="sm:inline">Карьера</span>
        </TabsTrigger>
      )}
      {showMarketEvents && (
        <TabsTrigger value="market" className="flex items-center gap-1 relative">
          <BarChart4 size={14} className="sm:size-16" />
          <span className="sm:inline">Рынок</span>
          {hasNewMarketEvent && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </TabsTrigger>
      )}
      <TabsTrigger value="achievements" className="flex items-center gap-1">
        <Medal size={14} className="sm:size-16" />
        <span className="sm:inline">Ачивки</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsHeader;
