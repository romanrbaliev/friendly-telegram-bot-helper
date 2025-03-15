import React, { useState, useEffect } from 'react';
import { Tabs } from "@/components/ui/tabs";
import TabsHeader from './TabsHeader';
import { GameTabsProps } from './types/GameTabsProps';
import { useIsMobile } from '@/hooks/use-mobile';

const GameTabs: React.FC<GameTabsProps> = ({
  activeTab,
  setActiveTab,
  showTrading,
  showEducation,
  showMining,
  showCareer,
  showMarketEvents,
  dollars,
  usdt,
  btc,
  knowledge,
  marketMultiplier,
  miningPower,
  handleSaveDollar,
  handleBuyCrypto,
  handleStaking,
  handleTrade,
  handleLearn,
  handlePurchaseRig,
  handleSelectRole,
  handleMarketChange,
  handlePrepareForEvent,
  showBuyCrypto,
  showBuyUsdt,
  showStaking,
  role,
  handleLearnBasics,
  clicks,
  handleBuyUsdt
}) => {
  const [hasNewMarketEvent, setHasNewMarketEvent] = useState(false);
  const [miningAnimation, setMiningAnimation] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (showMarketEvents && !hasNewMarketEvent) {
      const randomChance = Math.random();
      if (randomChance > 0.5) {
        setHasNewMarketEvent(true);
      }
    }
  }, [showMarketEvents, hasNewMarketEvent]);
  
  useEffect(() => {
    if (activeTab === 'market') {
      setHasNewMarketEvent(false);
    }
  }, [activeTab]);
  
  useEffect(() => {
    if (miningPower > 0) {
      const interval = setInterval(() => {
        setMiningAnimation(true);
        setTimeout(() => setMiningAnimation(false), 1000);
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [miningPower]);
  
  useEffect(() => {
    if (marketMultiplier > 1) {
      setHasNewMarketEvent(true);
      
      const timeout = setTimeout(() => {
        if (marketMultiplier === 1) {
          setHasNewMarketEvent(false);
        }
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [marketMultiplier]);
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
      <TabsHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showTrading={showTrading}
        showEducation={showEducation}
        showMining={showMining}
        showCareer={showCareer}
        showMarketEvents={showMarketEvents}
        miningPower={miningPower}
        hasNewMarketEvent={hasNewMarketEvent}
        miningAnimation={miningAnimation}
        marketMultiplier={marketMultiplier}
      />
    </Tabs>
  );
};

export default GameTabs;
