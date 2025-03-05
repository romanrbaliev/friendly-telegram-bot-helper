
import React from 'react';
import { toast } from '@/components/ui/use-toast';
import ActionButton from './ActionButton';
import { GraduationCap, BookOpen, Lightbulb, LineChart } from 'lucide-react';

interface EducationProps {
  dollars: number;
  onLearn: (cost: number, knowledgeGain: number) => boolean;
  knowledge: number;
}

interface Course {
  id: string;
  name: string;
  description: string;
  cost: number;
  knowledgeGain: number;
  requiredKnowledge: number;
  icon: React.ReactNode;
}

const Education: React.FC<EducationProps> = ({ dollars, onLearn, knowledge }) => {
  const courses: Course[] = [
    {
      id: "basic",
      name: "Основы криптовалют",
      description: "Базовые знания о блокчейне и криптовалютах",
      cost: 50,
      knowledgeGain: 10,
      requiredKnowledge: 0,
      icon: <BookOpen size={16} />
    },
    {
      id: "trading",
      name: "Трейдинг для начинающих",
      description: "Основные стратегии и инструменты трейдинга",
      cost: 120,
      knowledgeGain: 15,
      requiredKnowledge: 10,
      icon: <LineChart size={16} />
    },
    {
      id: "advanced",
      name: "Продвинутые инвестиции",
      description: "Диверсификация портфеля и управление рисками",
      cost: 300,
      knowledgeGain: 25,
      requiredKnowledge: 30,
      icon: <Lightbulb size={16} />
    }
  ];

  const handleTakeCourse = (course: Course) => {
    console.log(`Попытка пройти курс: ${course.name}, стоимость: ${course.cost}$, знания: ${course.knowledgeGain}`);
    if (dollars >= course.cost && knowledge >= course.requiredKnowledge) {
      const success = onLearn(course.cost, course.knowledgeGain);
      if (success) {
        console.log(`Курс "${course.name}" успешно пройден`);
      }
    } else {
      console.log("Недостаточно средств или знаний для прохождения курса");
      
      if (dollars < course.cost) {
        toast({
          title: "Недостаточно средств",
          description: `Для прохождения курса требуется $${course.cost}`,
          duration: 3000
        });
      } else if (knowledge < course.requiredKnowledge) {
        toast({
          title: "Недостаточно базовых знаний",
          description: `Требуется ${course.requiredKnowledge}% знаний`,
          duration: 3000
        });
      }
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
      <div className="space-y-3">
        {courses.map(course => (
          <div key={course.id} className="border border-gray-700 rounded-md p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-white flex items-center gap-1">
                {course.icon}
                {course.name}
              </h3>
              <span className="text-xs font-mono text-amber-400">${course.cost}</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{course.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-blue-400">+{course.knowledgeGain}% знаний</span>
              <ActionButton
                onClick={() => handleTakeCourse(course)}
                disabled={dollars < course.cost || knowledge < course.requiredKnowledge}
                tooltip={
                  dollars < course.cost 
                    ? `Нужно $${course.cost}` 
                    : knowledge < course.requiredKnowledge 
                      ? `Требуется ${course.requiredKnowledge}% знаний` 
                      : "Пройти курс"
                }
              >
                Пройти курс
              </ActionButton>
            </div>
            {knowledge < course.requiredKnowledge && (
              <div className="mt-2 text-xs text-yellow-500">
                Требуется знаний: {course.requiredKnowledge}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
