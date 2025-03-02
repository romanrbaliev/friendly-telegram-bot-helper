
import React from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { GraduationCap } from 'lucide-react';

interface EducationProps {
  dollars: number;
  onLearn: (cost: number) => void;
  knowledge: number;
}

const Education: React.FC<EducationProps> = ({ dollars, onLearn, knowledge }) => {
  const courseCost = 50;

  const handleTakeCourse = () => {
    if (dollars >= courseCost) {
      onLearn(courseCost);
      toast({
        title: "Курс пройден!",
        description: "Вы получили новые знания о криптовалютах"
      });
    }
  };

  return (
    <div className="glass-morphism p-4 rounded-lg mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 text-white border-b border-white/10 pb-2 flex items-center gap-2">
        <GraduationCap size={20} />
        Образование
      </h2>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Уровень знаний:</span>
          <span>{knowledge}/100</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${knowledge}%` }}
          />
        </div>
      </div>
      <ActionButton
        onClick={handleTakeCourse}
        disabled={dollars < courseCost}
        tooltip={dollars < courseCost ? `Нужно $${courseCost}` : "Пройти курс по криптовалютам"}
        longPressTooltip="Обучение снижает комиссии и открывает новые возможности"
      >
        Пройти курс (${courseCost})
      </ActionButton>
    </div>
  );
};

export default Education;
