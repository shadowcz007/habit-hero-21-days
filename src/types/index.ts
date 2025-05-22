
export interface Habit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  celebrity: {
    name: string;
    description: string;
    story: string;
  };
  quotes: string[];
  scienceExplanation: string;
}

export interface Challenge {
  id: string;
  habitId: string;
  startDate: string;
  endDate: string;
  reminderTime: string;
  days: {
    day: number;
    completed: boolean;
    completedAt: string | null;
  }[];
  isActive: boolean;
}

export interface User {
  activeChallenge: Challenge | null;
  completedChallenges: Challenge[];
}
