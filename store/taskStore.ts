import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TaskStore {
    task: string;
    setTask: (data: string) => void;
}

export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            task: "",
            setTask: (newTask: string) => set({ task: newTask }),
        }),
        {
            name: 'task-storage', // unique name for the storage
            storage: createJSONStorage(() => localStorage), // configure which storage to use
        }
    )

        
);