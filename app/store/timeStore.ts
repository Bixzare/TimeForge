import { create } from 'zustand';

interface timeStore {
    pomadoro:number;
    setPomadoro: (data:number)=> void;
    resetPomadoro: () => void;

    break:number;
    setBreak: (data:number)=> void;
    resetBreak: () => void;
}

export const useTimeStore = create<timeStore>((set) =>({
    pomadoro: 1200,

    setPomadoro: (newpomadoro:number) => set({ pomadoro: newpomadoro}),

    resetPomadoro:() => set({pomadoro:1200}),

    break:360,

    setBreak: (newbreak:number) => set({ break: newbreak}),

    resetBreak:() => set({break:360})

    

}));



