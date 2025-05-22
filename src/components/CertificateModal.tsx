
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Habit } from "@/types";
import { Trophy } from "lucide-react";
import Confetti from "./Confetti";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit;
  completionDate: string;
}

const CertificateModal = ({ isOpen, onClose, habit, completionDate }: CertificateModalProps) => {
  const formattedDate = new Date(completionDate).toLocaleDateString("zh-CN");
  
  return (
    <>
      <Confetti show={isOpen} />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] sm:max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold gradient-text mb-4">
              恭喜你完成21天挑战！
            </DialogTitle>
          </DialogHeader>
          
          <div className="border-8 border-double border-habit-purple p-6 bg-white text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-habit-purple" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">成就证书</h1>
            <h2 className="text-xl gradient-text mb-6">21天自律挑战</h2>
            
            <p className="mb-3">兹证明</p>
            <p className="text-xl font-bold mb-3">尊敬的挑战者</p>
            <p className="mb-4">
              成功完成了21天"{habit.title}"习惯养成挑战<br />
              做到了像{habit.celebrity.name}一样的自律
            </p>
            
            <div className="mt-6 text-sm">
              <p>挑战完成日期：{formattedDate}</p>
              <p className="mt-1">证书编号：HC-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            </div>
          </div>
          
          <DialogFooter className="flex justify-center mt-4">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-habit-purple to-habit-dark-purple hover:opacity-90"
            >
              继续前进
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificateModal;
