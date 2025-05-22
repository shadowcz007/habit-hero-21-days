
import { useEffect, useState } from "react";

interface ConfettiProps {
  show: boolean;
}

const Confetti = ({ show }: ConfettiProps) => {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (show) {
      const colors = ["#9b87f5", "#7E69AB", "#D3E4FD", "#F2FCE2", "#FEF7CD", "#FDE1D3", "#FFDEE2"];
      const pieces: JSX.Element[] = [];
      
      for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = `${Math.random() * 100}%`;
        const animation = [
          "animate-confetti-slow",
          "animate-confetti-medium",
          "animate-confetti-fast",
        ][Math.floor(Math.random() * 3)];
        
        pieces.push(
          <div
            key={i}
            className={`confetti ${animation}`}
            style={{
              left,
              top: "-10px",
              backgroundColor: color,
              transform: `scale(${0.5 + Math.random()})`,
            }}
          />
        );
      }
      
      setConfetti(pieces);
      
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;
  
  return <div className="confetti-container">{confetti}</div>;
};

export default Confetti;
