
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
  
  // Разделяем вкладки на два ряда
  const firstRowTabs = [
    { 
      id: 'main', 
      show: true, 
      icon: <DollarSign size={12} />, 
      text: 'Основное',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'trading', 
      show: showTrading, 
      icon: <ArrowUpDown size={12} />, 
      text: 'Трейдинг',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'education', 
      show: showEducation, 
      icon: <GraduationCap size={12} />, 
      text: 'Обучение',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'mining', 
      show: showMining, 
      icon: <HardDrive size={12} className={`${miningAnimation ? 'text-yellow-400' : ''}`} />, 
      text: 'Майнинг',
      badge: miningPower > 0 ? (
        <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-auto text-xs py-0 px-1 ${miningAnimation ? 'animate-pulse' : ''}`}>
          {miningPower}
        </Badge>
      ) : null,
      animation: miningAnimation,
      notification: false
    }
  ];
  
  const secondRowTabs = [
    { 
      id: 'career', 
      show: showCareer, 
      icon: <Briefcase size={12} />, 
      text: 'Карьера',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'market', 
      show: showMarketEvents, 
      icon: isBullMarket ? (
        <TrendingUp size={12} className="text-green-500" />
      ) : (
        <BarChart4 size={12} />
      ), 
      text: isBullMarket ? "Бычий рынок!" : "Рынок",
      badge: isBullMarket ? (
        <Badge variant="success" className="ml-auto text-xs py-0 px-1 animate-pulse">
          +{((marketMultiplier - 1) * 100).toFixed(0)}%
        </Badge>
      ) : null,
      animation: isBullMarket,
      notification: hasNewMarketEvent && !isBullMarket
    },
    { 
      id: 'staking', 
      show: true, 
      icon: <Shield size={12} />, 
      text: 'Стейкинг',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'achievements', 
      show: true, 
      icon: <Medal size={12} />, 
      text: 'Ачивки',
      badge: null,
      animation: false,
      notification: false
    }
  ];
  
  const renderTabRow = (tabs: any[]) => {
    return tabs.filter(tab => tab.show).map(tab => (
      <TabsTrigger 
        key={tab.id}
        value={tab.id} 
        className={`flex items-center justify-start gap-1 p-1 text-xs h-8 ${tab.animation ? 'animate-pulse' : ''} relative`}
      >
        {tab.icon}
        <span className="text-xs whitespace-nowrap overflow-hidden">{tab.text}</span>
        {tab.badge}
        {tab.notification && (
          <span className="absolute top-1 left-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </TabsTrigger>
    ));
  };
  
  return (
    <div className="animate-fade-in w-full">
      <div className="flex flex-col gap-1">
        <TabsList className="grid grid-cols-1 gap-1 w-full">
          {renderTabRow(firstRowTabs)}
        </TabsList>
        
        <TabsList className="grid grid-cols-1 gap-1 w-full">
          {renderTabRow(secondRowTabs)}
        </TabsList>
      </div>
    </div>
  );
};

export default TabsHeader;
