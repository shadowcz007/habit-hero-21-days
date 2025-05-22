
import { Button } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-habit-light-purple">
      <div className="max-w-lg text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-3 gradient-text">习惯养成神器</h1>
        <h2 className="text-2xl font-medium mb-6">21天挑战版</h2>
        
        <p className="text-lg mb-8">
          21天，像名人一样自律。<br />
          选择一个习惯，坚持21天，改变你的生活。
        </p>
        
        <div className="flex flex-col space-y-4 items-center">
          <Button
            onClick={() => navigate('/habits')}
            className="group bg-gradient-to-r from-habit-purple to-habit-dark-purple hover:opacity-90 text-white px-8 py-6 rounded-xl text-lg"
          >
            <span>开始改变</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-gray-500">
            选择一个习惯模板，开启你的21天自律之旅
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
