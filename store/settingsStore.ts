import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of our settings object
interface Settings {
  autoplay: boolean;
  // Add more settings here in the future
  // darkMode: boolean,
  // soundEnabled: boolean,
  // etc.
  notificationEnabled: boolean;
  theme:string;
  themeValue:string;
  sound:boolean;
  soundType:string;
}

interface SettingsStore {
  // The main settings object
  settings: Settings;
  
  // Function to update one or more settings
  updateSettings: (newSettings: Partial<Settings>) => void;
  
  // Reset all settings to defaults
  resetSettings: () => void;
}

// Default settings values
const defaultSettings: Settings = {
  autoplay: false,
  notificationEnabled:true,
  theme:"blue",
  themeValue:'oklch(0.623 0.214 259.815)',
  sound:true,
  soundType:"1"
  // Define defaults for future settings here
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // Initialize with default settings
      settings: defaultSettings,
      
      // Update specific settings while preserving others
      updateSettings: (newSettings: Partial<Settings>) => 
        set((state) => ({ 
          settings: { ...state.settings, ...newSettings } 
        })),
      
      // Reset all settings to their default values
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);