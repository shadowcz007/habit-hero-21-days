
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Habit } from "@/types";
import Confetti from "./Confetti";

interface CheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit;
  day: number;
  onComplete: () => void;
}

const CheckinModal = ({ isOpen, onClose, habit, day, onComplete }: CheckinModalProps) => {
  const [showQuote, setShowQuote] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleCheckin = () => {
    setShowConfetti(true);
    setShowQuote(true);
    
    setTimeout(() => {
      onComplete();
      setShowQuote(false);
      setShowConfetti(false);
    }, 3000);
  };
  
  const quote = habit.quotes[Math.floor(Math.random() * habit.quotes.length)];
  
  return (
    <>
      <Confetti show={showConfetti} />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              第 {day} 天 - {habit.title}
            </DialogTitle>
          </DialogHeader>
          
          {!showQuote ? (
            <div className="py-4 text-center">
              <h3 className="text-lg font-medium mb-6">你今天完成了 "{habit.title}" 了吗？</h3>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  还没有
                </Button>
                <Button
                  onClick={handleCheckin}
                  className="bg-gradient-to-r from-habit-purple to-habit-dark-purple hover:opacity-90"
                >
                  已完成
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center animate-fade-in">
              <p className="text-xl italic mb-4">"<span className="text-habit-purple">{quote}</span>"</p>
              <p className="text-sm text-gray-500">—— {habit.celebrity.name}</p>
            </div>
          )}
          
          <DialogFooter className="flex justify-center">
            {showQuote && (
              <Button
                variant="ghost"
                onClick={() => {
                  onComplete();
                  setShowQuote(false);
                }}
                className="text-sm"
              >
                点击继续
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckinModal;
