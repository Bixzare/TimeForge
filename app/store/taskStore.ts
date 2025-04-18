import { create } from 'zustand';

interface taskStore {
    task:string;
    setTask: (data:string) => void;
}

export const useTaskStore = create<taskStore>((set) =>({

    task:"Set up tabs, Setup the break timer and transition between them, set up settings and **** Local storage for zustand store ****, custom values for pomadoro and break , *** Circile wrapper for circle clock *** with motion animation",
    setTask: (newTask:string) => set({ task: newTask }),

}));