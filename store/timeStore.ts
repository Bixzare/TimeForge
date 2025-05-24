import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface timeStore {
    pomodoro: number;
    setPomodoro: (data: number) => void;
    resetPomodoro: () => void;

    break: number;
    setBreak: (data: number) => void;
    resetBreak: () => void;

    longBreak: number;
    setLongBreak: (data: number) => void;
    resetLongBreak: () => void;
    

    timeRemaining: string;
    setTimeRemaining: (data: string) => void;

    complete: boolean;
    setComplete: (data:boolean) => void;

    interval: number;
    setInterval: (data:number) => void;
}

export const useTimeStore = create<timeStore>() (

    
    persist(
        (set) => ({
            pomodoro: 1500,
            setPomodoro: (newpomodoro: number) => set({ pomodoro: newpomodoro }),
            resetPomodoro: () => set({ pomodoro: 1200 }),
        
            break: 300,
            setBreak: (newbreak: number) => set({ break: newbreak }),
            resetBreak: () => set({ break: 300 }),
        
            longBreak: 900,
            setLongBreak: (newlongbreak: number) => set({ longBreak: newlongbreak }),
            resetLongBreak: () => set({ longBreak: 900 }),

            timeRemaining:"00:00",
            setTimeRemaining: (newTimeRemaining: string) => set({ timeRemaining: newTimeRemaining }),

            complete:false,
            setComplete:  (data:boolean) => set({ complete:data }),

            interval:0,
            setInterval: (newInterval: number) => set({ interval: newInterval }),   

        }),
        {
            name: 'time-storage', // unique name for the storage
            storage: createJSONStorage(() => localStorage), // configure which storage to use
        }
    )
    
    
);

// persist