
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HabitCard from "@/components/HabitCard";
import HabitDetail from "@/components/HabitDetail";
import { habits } from "@/data/habits";
import { Habit, Challenge } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { CalendarCheck } from "lucide-react";

const HabitLibrary = () => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStartChallenge = (reminderTime: string) => {
    if (!selectedHabit) return;
    
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 20); // 21 days including today
    
    const days = Array.from({ length: 21 }, (_, i) => ({
      day: i + 1,
      completed: false,
      completedAt: null,
    }));
    
    const challenge: Challenge = {
      id: crypto.randomUUID(),
      habitId: selectedHabit.id,
      startDate: today.toISOString(),
      endDate: endDate.toISOString(),
      reminderTime,
      days,
      isActive: true,
    };
    
    // 保存到本地存储
    localStorage.setItem('activeChallenge', JSON.stringify(challenge));
    localStorage.setItem('activeHabitId', selectedHabit.id);
    
    toast({
      title: "挑战创建成功！",
      description: `你已开始21天"${selectedHabit.title}"挑战，加油！`,
    });
    
    // 关闭弹窗并导航到挑战页面
    setSelectedHabit(null);
    navigate('/challenge');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 gradient-text">习惯模板库</h1>
          <p className="text-lg text-gray-600">
            选择一个名人习惯，开始你的21天挑战
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onClick={() => setSelectedHabit(habit)}
            />
          ))}
        </div>
        
        {selectedHabit && (
          <HabitDetail
            habit={selectedHabit}
            isOpen={!!selectedHabit}
            onClose={() => setSelectedHabit(null)}
            onStartChallenge={handleStartChallenge}
          />
        )}
      </div>
    </div>
  );
};

export default HabitLibrary;
