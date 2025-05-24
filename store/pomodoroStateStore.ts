import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PomodoroStateStore {
    pomodoroState: string;
    setPomodoroState: (data: string) => void;

    pomodoroCounter:number;
    setPomodoroCounter: (data:number) => void;
}

export const usePomodoroStateStore = create<PomodoroStateStore>()(
    persist(
        (set) => ({
            pomodoroState: "pomodoro",
            setPomodoroState: (newState: string) => set({ pomodoroState: newState }),
            pomodoroCounter: 4,
            setPomodoroCounter : (newState: number) => set({pomodoroCounter: newState}),
        }),
        {
            name: 'pomodoroState-storage', // unique name for the storage
            storage: createJSONStorage(() => localStorage), // configure which storage to use
        }
    )
);