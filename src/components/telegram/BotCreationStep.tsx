
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

interface BotCreationStepProps {
  title: string;
  description: string;
  step: number;
  currentStep: number;
  isCompleted: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}

const BotCreationStep = ({
  title,
  description,
  step,
  currentStep,
  isCompleted,
  onSelect,
  children
}: BotCreationStepProps) => {
  const isActive = step === currentStep;
  
  return (
    <Card 
      className={`transition-all duration-300 mb-4 overflow-hidden ${
        isActive 
          ? 'border-primary/50 shadow-md ring-1 ring-primary/20' 
          : 'hover:border-gray-300 dark:hover:border-gray-700'
      }`}
    >
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
              ${isCompleted 
                ? 'bg-primary text-white' 
                : isActive 
                  ? 'bg-primary/10 text-primary border border-primary/30' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              }
            `}>
              {isCompleted ? <Check size={16} /> : step}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSelect}
            className={`rounded-full ${!isActive ? 'opacity-0' : 'opacity-100'}`}
            disabled={isActive}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
        <CardDescription className="mt-1 ml-11">
          {description}
        </CardDescription>
      </CardHeader>
      
      {isActive && (
        <CardContent className="animate-fade-in pb-6">
          {children}
        </CardContent>
      )}
      
      {isActive && (
        <CardFooter className="pt-0 pb-4 flex justify-end">
          <Button 
            onClick={onSelect} 
            className="rounded-full px-4 transition-all"
          >
            Продолжить
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BotCreationStep;
