
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
      text: 'Т',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'education', 
      show: showEducation, 
      icon: <GraduationCap size={14} />, 
      text: 'О',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'mining', 
      show: showMining, 
      icon: <HardDrive size={14} className={`${miningAnimation ? 'text-yellow-400' : ''}`} />, 
      text: 'М',
      badge: miningPower > 0 ? (
        <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-1 text-[8px] py-0 px-1 ${miningAnimation ? 'animate-pulse' : ''}`}>
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
      text: 'К',
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
      text: isBullMarket ? "+" : "Р",
      badge: isBullMarket ? (
        <Badge variant="success" className="ml-1 text-[8px] py-0 px-1 animate-pulse">
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
      text: 'С',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'achievements', 
      show: true, 
      icon: <Medal size={14} />, 
      text: 'А',
      badge: null,
      animation: false,
      notification: false
    }
  ];
  
  return (
    <div className="animate-fade-in w-full">
      <div className="flex flex-col gap-1 w-full h-auto">
        {tabs.filter(tab => tab.show).map(tab => (
          <button
            key={tab.id}
            className={`mobile-tab-button ${activeTab === tab.id ? 'active' : ''} ${tab.animation ? 'animate-pulse' : ''} relative`}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="flex items-center gap-1">
              {tab.icon}
              <span className="text-[9px] whitespace-nowrap">{tab.text}</span>
            </div>
            {tab.badge}
            {tab.notification && (
              <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsHeader;
