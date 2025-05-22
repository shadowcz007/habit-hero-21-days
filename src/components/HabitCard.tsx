
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Habit } from "@/types";
import { CalendarCheck, ArrowRight } from "lucide-react";

interface HabitCardProps {
  habit: Habit;
  onClick: () => void;
}

const HabitCard = ({ habit, onClick }: HabitCardProps) => {
  return (
    <Card 
      className={`habit-card bg-habit-${habit.color} cursor-pointer overflow-hidden relative`}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-3">
          {habit.icon === "sunrise" && <CalendarCheck className="h-6 w-6 mr-2 text-habit-purple" />}
          {habit.icon === "book" && <CalendarCheck className="h-6 w-6 mr-2 text-habit-purple" />}
          {habit.icon === "brain" && <CalendarCheck className="h-6 w-6 mr-2 text-habit-purple" />}
          {habit.icon === "dumbbell" && <CalendarCheck className="h-6 w-6 mr-2 text-habit-purple" />}
          {habit.icon === "pencil" && <CalendarCheck className="h-6 w-6 mr-2 text-habit-purple" />}
          {habit.icon === "droplet" && <CalendarCheck className="h-6 w-6 mr-2 text-habit-purple" />}
          {habit.icon === "clock" && <CalendarCheck className="h-6 w-6 mr-2 text-habit-purple" />}
          <h3 className="font-bold text-lg">{habit.title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">{habit.description}</p>
        <p className="text-sm font-medium mb-4">
          <span className="text-habit-dark-purple">灵感来源: </span>
          {habit.celebrity.name}
        </p>
        <div className="mt-auto">
          <Button className="w-full group" onClick={onClick}>
            <span>开始21天挑战</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HabitCard;
