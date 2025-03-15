
import React, { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HintPopupProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const HintPopup: React.FC<HintPopupProps> = ({ 
  title, 
  description, 
  isOpen, 
  onClose 
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-gray-800 border border-gray-700 text-white max-w-sm">
        <div className="flex justify-between items-start">
          <AlertDialogTitle className="text-lg font-semibold text-yellow-400">
            {title}
          </AlertDialogTitle>
          <Button 
            onClick={onClose} 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
          >
            <X size={18} />
          </Button>
        </div>
        <AlertDialogDescription className="text-gray-300 mt-2">
          {description}
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HintPopup;
