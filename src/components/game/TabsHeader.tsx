
import React from 'react';
import { DollarSign, GraduationCap, ArrowUpDown, HardDrive, Briefcase, BarChart4, Medal, TrendingUp, Shield } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  const tabs = [
    { 
      id: 'main', 
      show: true, 
      icon: <DollarSign size={18} />, 
      text: 'О',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'trading', 
      show: showTrading, 
      icon: <ArrowUpDown size={18} />, 
      text: 'Т',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'education', 
      show: showEducation, 
      icon: <GraduationCap size={18} />, 
      text: 'О',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'mining', 
      show: showMining, 
      icon: <HardDrive size={18} className={`${miningAnimation ? 'text-yellow-400' : ''}`} />, 
      text: 'М',
      badge: miningPower > 0 ? (
        <Badge variant={miningAnimation ? "success" : "outline"} className={`ml-1 text-[7px] py-0 px-1 ${miningAnimation ? 'animate-pulse' : ''}`}>
          {miningPower}
        </Badge>
      ) : null,
      animation: miningAnimation,
      notification: false
    },
    { 
      id: 'career', 
      show: showCareer, 
      icon: <Briefcase size={18} />, 
      text: 'К',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'market', 
      show: showMarketEvents, 
      icon: isBullMarket ? (
        <TrendingUp size={18} className="text-green-500" />
      ) : (
        <BarChart4 size={18} />
      ), 
      text: isBullMarket ? "+" : "Р",
      badge: isBullMarket ? (
        <Badge variant="success" className="ml-1 text-[7px] py-0 px-1 animate-pulse">
          +{((marketMultiplier - 1) * 100).toFixed(0)}%
        </Badge>
      ) : null,
      animation: isBullMarket,
      notification: hasNewMarketEvent && !isBullMarket
    },
    { 
      id: 'staking', 
      show: true, 
      icon: <Shield size={18} />, 
      text: 'С',
      badge: null,
      animation: false,
      notification: false
    },
    { 
      id: 'achievements', 
      show: true, 
      icon: <Medal size={18} />, 
      text: 'А',
      badge: null,
      animation: false,
      notification: false
    }
  ];
  
  return (
    <div className="mobile-tabs-container">
      {tabs.filter(tab => tab.show).map(tab => (
        <button
          key={tab.id}
          className={`mobile-tab-button ${activeTab === tab.id ? 'active-tab' : ''} ${tab.animation ? 'animate-pulse' : ''} relative`}
          onClick={() => setActiveTab(tab.id)}
          aria-label={tab.text}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.notification && (
            <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></span>
          )}
          {tab.badge}
        </button>
      ))}
    </div>
  );
};

export default TabsHeader;
