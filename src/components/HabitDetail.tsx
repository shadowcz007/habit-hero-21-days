
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Habit } from "@/types";
import { CalendarCheck, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface HabitDetailProps {
  habit: Habit;
  isOpen: boolean;
  onClose: () => void;
  onStartChallenge: (reminderTime: string) => void;
}

const HabitDetail = ({ habit, isOpen, onClose, onStartChallenge }: HabitDetailProps) => {
  const [reminderTime, setReminderTime] = useState("08:00");
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">{habit.title}</DialogTitle>
          <DialogDescription>
            {habit.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-habit-light-purple p-4 rounded-lg">
            <h3 className="font-bold text-habit-purple mb-1">名人习惯: {habit.celebrity.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{habit.celebrity.description}</p>
            <p className="text-sm">{habit.celebrity.story}</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-700 mb-2">科学依据</h3>
            <p className="text-sm">{habit.scienceExplanation}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-bold text-gray-700 mb-2">名人语录</h3>
            <ul className="space-y-2">
              {habit.quotes.map((quote, index) => (
                <li key={index} className="text-sm italic bg-secondary p-3 rounded-lg">"<span className="text-habit-purple">{quote}</span>"</li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-bold text-gray-700 mb-3">挑战设置</h3>
            <div className="flex items-center space-x-2 mb-4">
              <CalendarCheck className="h-5 w-5 text-habit-purple" />
              <span className="text-sm font-medium">21天挑战</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-habit-purple" />
              <span className="text-sm font-medium">每日提醒时间</span>
              <Input 
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-32"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="sm:mr-2">
            返回
          </Button>
          <Button 
            onClick={() => onStartChallenge(reminderTime)}
            className="bg-gradient-to-r from-habit-purple to-habit-dark-purple hover:opacity-90"
          >
            开始21天挑战
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HabitDetail;
