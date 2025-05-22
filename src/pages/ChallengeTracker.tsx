
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, CheckCircle, Trophy, Clock } from "lucide-react";
import { Habit, Challenge } from "@/types";
import { habits } from "@/data/habits";
import ProgressBar from "@/components/ProgressBar";
import CheckinModal from "@/components/CheckinModal";
import CertificateModal from "@/components/CertificateModal";
import { useToast } from "@/components/ui/use-toast";

const ChallengeTracker = () => {
  const [activeHabit, setActiveHabit] = useState<Habit | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 从localStorage加载活跃挑战
  useEffect(() => {
    const savedChallenge = localStorage.getItem('activeChallenge');
    const savedHabitId = localStorage.getItem('activeHabitId');
    
    if (savedChallenge && savedHabitId) {
      const parsedChallenge = JSON.parse(savedChallenge) as Challenge;
      const habit = habits.find(h => h.id === savedHabitId);
      
      if (habit) {
        setActiveHabit(habit);
        setChallenge(parsedChallenge);
        
        // 检查是否已完成全部21天
        const allCompleted = parsedChallenge.days.every(day => day.completed);
        if (allCompleted) {
          setShowCertificateModal(true);
        }
      }
    } else {
      navigate('/habits');
    }
  }, [navigate]);
  
  const handleCheckin = () => {
    if (!challenge || !activeHabit) return;
    
    // 找到当天的索引
    const today = new Date();
    const startDate = new Date(challenge.startDate);
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const currentDayIndex = Math.min(daysPassed, 20); // 最大索引是20（第21天）
    
    setShowCheckinModal(true);
  };
  
  const completeCheckin = () => {
    if (!challenge || !activeHabit) return;
    
    // 找到当天的索引
    const today = new Date();
    const startDate = new Date(challenge.startDate);
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const currentDayIndex = Math.min(daysPassed, 20); // 最大索引是20（第21天）
    
    // 更新当天的完成状态
    const updatedDays = [...challenge.days];
    if (!updatedDays[currentDayIndex].completed) {
      updatedDays[currentDayIndex] = {
        ...updatedDays[currentDayIndex],
        completed: true,
        completedAt: new Date().toISOString()
      };
    }
    
    const updatedChallenge = { ...challenge, days: updatedDays };
    setChallenge(updatedChallenge);
    localStorage.setItem('activeChallenge', JSON.stringify(updatedChallenge));
    
    setShowCheckinModal(false);
    
    // 检查是否已完成全部21天
    const allCompleted = updatedDays.every(day => day.completed);
    if (allCompleted) {
      setTimeout(() => {
        setShowCertificateModal(true);
      }, 500);
    }
  };
  
  // 计算当前进度
  const calculateProgress = () => {
    if (!challenge) return { currentDay: 1, completedDays: 0, streak: 0 };
    
    const today = new Date();
    const startDate = new Date(challenge.startDate);
    const daysPassed = Math.min(
      Math.floor((today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1, 
      21
    );
    
    const completedDays = challenge.days.filter(day => day.completed).length;
    
    // 计算连续打卡天数
    let streak = 0;
    for (let i = daysPassed - 1; i >= 0; i--) {
      if (challenge.days[i]?.completed) {
        streak++;
      } else {
        break;
      }
    }
    
    return { currentDay: daysPassed, completedDays, streak };
  };
  
  const progress = calculateProgress();
  
  // 如果没有活跃的挑战或习惯，显示加载状态
  if (!challenge || !activeHabit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>加载中...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-text">{activeHabit.title}</h1>
          <p className="text-gray-600">21天习惯养成挑战</p>
        </div>
        
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CalendarCheck className="h-5 w-5 text-habit-purple mr-2" />
                <span className="font-medium">今天是第 {progress.currentDay} 天</span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString("zh-CN")}
              </div>
            </div>
            
            <ProgressBar 
              current={progress.currentDay} 
              total={21} 
              className="mb-6" 
            />
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-habit-light-purple rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">已完成</p>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-habit-purple mr-1" />
                  <span className="font-bold text-xl">{progress.completedDays} 天</span>
                </div>
              </div>
              <div className="bg-habit-soft-green rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">连续打卡</p>
                <div className="flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-habit-purple mr-1" />
                  <span className="font-bold text-xl">{progress.streak} 天</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 inline-block mr-1" />
                每日提醒时间: {challenge.reminderTime}
              </p>
              <Button
                onClick={handleCheckin}
                className="w-full py-6 text-lg font-medium bg-gradient-to-r from-habit-purple to-habit-dark-purple hover:opacity-90"
              >
                完成今日打卡
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="days">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="days" className="flex-1">每日记录</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">习惯详情</TabsTrigger>
          </TabsList>
          
          <TabsContent value="days">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-7 gap-2">
                  {challenge.days.map((day, index) => (
                    <div
                      key={index}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                        ${day.completed ? 'bg-habit-purple text-white' : (
                          index < progress.currentDay ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-400'
                        )}
                      `}
                    >
                      {day.day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">习惯详情</h3>
                  <p className="text-sm">{activeHabit.description}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">灵感来源: {activeHabit.celebrity.name}</h3>
                  <p className="text-sm">{activeHabit.celebrity.story}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">科学依据</h3>
                  <p className="text-sm">{activeHabit.scienceExplanation}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {showCheckinModal && activeHabit && (
        <CheckinModal
          isOpen={showCheckinModal}
          onClose={() => setShowCheckinModal(false)}
          habit={activeHabit}
          day={progress.currentDay}
          onComplete={completeCheckin}
        />
      )}
      
      {showCertificateModal && activeHabit && (
        <CertificateModal
          isOpen={showCertificateModal}
          onClose={() => setShowCertificateModal(false)}
          habit={activeHabit}
          completionDate={new Date().toISOString()}
        />
      )}
    </div>
  );
};

export default ChallengeTracker;
