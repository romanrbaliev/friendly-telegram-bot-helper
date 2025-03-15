
import React, { useState, useEffect } from 'react';
import { Tabs } from "@/components/ui/tabs";
import TabsHeader from './TabsHeader';
import TabsContentComponent from './TabsContent';
import { GameTabsProps } from './types/GameTabsProps';

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
  showStaking,
  role,
  handleLearnBasics,
  clicks
}) => {
  const [hasNewMarketEvent, setHasNewMarketEvent] = useState(false);
  const [miningAnimation, setMiningAnimation] = useState(false);
  
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
  
  // Mining power notification effect
  useEffect(() => {
    if (miningPower > 0) {
      const interval = setInterval(() => {
        setMiningAnimation(true);
        setTimeout(() => setMiningAnimation(false), 1000);
      }, 30000); // Show animation every 30 seconds to indicate mining is active
      
      return () => clearInterval(interval);
    }
  }, [miningPower]);
  
  // Добавим эффект "бычьего рынка" - анимацию для подсветки вкладки "Рынок"
  useEffect(() => {
    if (marketMultiplier > 1) {
      // Если активен "бычий рынок", добавим анимацию для вкладки "Рынок"
      setHasNewMarketEvent(true);
      
      // Если бычий рынок закончился, удалим анимацию
      const timeout = setTimeout(() => {
        if (marketMultiplier === 1) {
          setHasNewMarketEvent(false);
        }
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [marketMultiplier]);
  
  console.log("GameTabs rendering with:", {
    showTrading,
    showEducation,
    showMining,
    showCareer,
    showMarketEvents,
    dollars,
    knowledge,
    miningPower,
    clicks
  });
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
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
      
      <TabsContentComponent 
        activeTab={activeTab}
        dollars={dollars}
        usdt={usdt}
        btc={btc}
        knowledge={knowledge}
        miningPower={miningPower}
        showTrading={showTrading}
        showEducation={showEducation}
        showMining={showMining}
        showCareer={showCareer}
        showMarketEvents={showMarketEvents}
        handleSaveDollar={handleSaveDollar}
        handleBuyCrypto={handleBuyCrypto}
        handleStaking={handleStaking}
        handleTrade={handleTrade}
        handleLearn={handleLearn}
        handlePurchaseRig={handlePurchaseRig}
        handleSelectRole={handleSelectRole}
        handleMarketChange={handleMarketChange}
        handlePrepareForEvent={handlePrepareForEvent}
        marketMultiplier={marketMultiplier}
        showBuyCrypto={showBuyCrypto}
        showStaking={showStaking}
        role={role}
        handleLearnBasics={handleLearnBasics}
        clicks={clicks}
      />
    </Tabs>
  );
};

export default GameTabs;
