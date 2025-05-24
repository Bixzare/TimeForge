'use client';
import { useSettingsStore } from '@/store/settingsStore';
import { themePresets } from '@/lib/theme-presets';
import { useEffect } from 'react';
import { setThemeColors } from '@/lib/theme';

export function ThemePickerWrapper({ children }: { children : React.ReactNode}) {
    const { settings } = useSettingsStore()

    useEffect(() => {
        const preset = themePresets.find((p) => p.key === settings.theme)
        if (!preset) return
    
        const isDark = document.documentElement.classList.contains('dark')
        const targetColors = isDark ? preset.dark : preset.light
        setThemeColors(targetColors, isDark ? 'dark' : 'light')
      }, [settings.theme])
    
      return <>{children}</>
}
