
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  tooltip?: string;
  longPressTooltip?: string;
  longPressTime?: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children, 
  tooltip,
  longPressTooltip,
  longPressTime = 0
}) => {
  const [pressing, setPressing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Обработка долгого нажатия
  const handleMouseDown = () => {
    if (disabled) return;
    
    setPressing(true);
    
    if (longPressTime > 0 && longPressTooltip) {
      pressTimer.current = setTimeout(() => {
        toast({
          title: "Подсказка",
          description: longPressTooltip,
        });
      }, longPressTime);
    }
  };
  
  const handleMouseUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    
    if (!disabled && pressing) {
      console.log("Button clicked - executing onClick handler");
      onClick();
    }
    
    setPressing(false);
  };
  
  const handleMouseLeave = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    setPressing(false);
    setShowTooltip(false);
  };
  
  useEffect(() => {
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {tooltip && showTooltip && !disabled && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
      <Button
        type="button"
        variant="default"
        className={`w-full py-6 text-base font-medium transition-all shadow-md 
          ${pressing ? 'translate-y-0.5 bg-primary/80' : ''} 
          ${disabled 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
            : 'bg-[#403E43] hover:bg-[#2D2C31] text-white'
          }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setShowTooltip(true)}
        disabled={disabled}
      >
        {children}
      </Button>
    </div>
  );
};

export default ActionButton;
