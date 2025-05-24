import { useTimeStore } from "@/store/timeStore";
type TimerMode = string;

// Function to get the current time value based on mode
export const getTimeValue = (mode: TimerMode) => {
  const { pomodoro, break: breakTime, longBreak } = useTimeStore();
  
  switch (mode) {
    case 'pomodoro':
      return pomodoro;
    case 'break':
      return breakTime;
    case 'longBreak':
      return longBreak;
    default:
      return pomodoro; // Default fallback
  }
};

// Function to get the setter function based on mode
export const getSetterFunction = (mode: TimerMode) => {
  const { setPomodoro, setBreak, setLongBreak } = useTimeStore();
  
  switch (mode) {
    case 'pomodoro':
      return setPomodoro;
    case 'break':
      return setBreak;
    case 'longBreak':
      return setLongBreak;
    default:
      return setPomodoro; // Default fallback
  }
};

// Function to get the reset function based on mode
export const getResetFunction = (mode: TimerMode) => {
  const { resetPomodoro, resetBreak, resetLongBreak } = useTimeStore();
  
  switch (mode) {
    case 'pomodoro':
      return resetPomodoro;
    case 'break':
      return resetBreak;
    case 'longBreak':
      return resetLongBreak;
    default:
      return resetPomodoro; // Default fallback
  }
};

// Example usage:
// const mode: TimerMode = 'pomodoro';
// const currentTime = getTimeValue(mode);
// const setTime = getSetterFunction(mode);
// const resetTime = getResetFunction(mode);