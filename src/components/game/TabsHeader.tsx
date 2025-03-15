
import React from 'react';
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
  
  const tabs = [
    { 
      id: 'main', 
      show: true, 
      icon: <DollarSign size={14} />, 
      text: 'Осн',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'trading', 
      show: showTrading, 
      icon: <ArrowUpDown size={14} />, 
      text: 'Трейд',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'education', 
      show: showEducation, 
      icon: <GraduationCap size={14} />, 
      text: 'Обуч',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'mining', 
      show: showMining, 
      icon: <HardDrive size={14} className={`${miningAnimation ? 'text-yellow-400' : ''}`} />, 
      text: 'Майн',
      badge: miningPower > 0 ? (
        <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-1 text-xs py-0 px-1 ${miningAnimation ? 'animate-pulse' : ''}`}>
          {miningPower}
        </Badge>
      ) : null,
      animation: miningAnimation,
      notification: false
    },
    { 
      id: 'career', 
      show: showCareer, 
      icon: <Briefcase size={14} />, 
      text: 'Карьера',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'market', 
      show: showMarketEvents, 
      icon: isBullMarket ? (
        <TrendingUp size={14} className="text-green-500" />
      ) : (
        <BarChart4 size={14} />
      ), 
      text: isBullMarket ? "+" : "Рынок",
      badge: isBullMarket ? (
        <Badge variant="success" className="ml-1 text-xs py-0 px-1 animate-pulse">
          +{((marketMultiplier - 1) * 100).toFixed(0)}%
        </Badge>
      ) : null,
      animation: isBullMarket,
      notification: hasNewMarketEvent && !isBullMarket
    },
    { 
      id: 'staking', 
      show: true, 
      icon: <Shield size={14} />, 
      text: 'Стейк',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'achievements', 
      show: true, 
      icon: <Medal size={14} />, 
      text: 'Ачивки',
      badge: null,
      animation: false,
      notification: false
    }
  ];
  
  return (
    <div className="animate-fade-in w-full">
      <div className="flex flex-col gap-1 w-full h-auto bg-transparent">
        {tabs.filter(tab => tab.show).map(tab => (
          <button
            key={tab.id}
            className={`flex items-center justify-start gap-1 p-1 text-xs h-7 ${tab.animation ? 'animate-pulse' : ''} relative w-full 
            ${activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/80'} 
            rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center gap-1">
              {tab.icon}
              <span className="text-[10px] whitespace-nowrap">{tab.text}</span>
            </div>
            {tab.badge}
            {tab.notification && (
              <span className="absolute top-1 left-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsHeader;
