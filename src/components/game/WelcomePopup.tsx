
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle 
} from '@/components/ui/dialog';

interface WelcomePopupProps {
  open: boolean;
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] border-[#333333] text-white max-w-[90vw] md:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gradient-primary">Добро пожаловать в Crypto Clicker</DialogTitle>
          <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </DialogHeader>
        <DialogDescription className="text-gray-300 space-y-4">
          <p>
            Вы начинаете путь от полного безденежья до миллионного портфеля инвестиций 
            через погружение в мир криптовалют.
          </p>
          <p>
            Начните с малого — собирайте аирдропы (бесплатные раздачи криптовалют),
            чтобы постепенно открывать новые возможности для заработка.
          </p>
          <p className="font-medium text-white">
            Нажимайте на единственную доступную кнопку, чтобы начать свой путь!
          </p>
        </DialogDescription>
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={onClose}
            variant="default" 
            className="bg-primary/90 hover:bg-primary text-black"
          >
            Начать игру
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
