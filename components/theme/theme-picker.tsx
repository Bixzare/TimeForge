"use client";
import { setThemeColors } from "@/lib/theme";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { themePresets } from "@/lib/theme-presets";
import { useTheme } from "next-themes";

export function ThemePicker() {
  const { settings, updateSettings } = useSettingsStore();
  const [active, setActive] = React.useState(settings.theme || "red");
  const { theme, setTheme, resolvedTheme } = useTheme();

  // set theme in root
  React.useEffect(() => {
    const presets = themePresets.find((p) => p.key === active);
    if (!presets) return;

    const isDark = document.documentElement.classList.contains("dark");
    const targetColors = isDark ? presets.dark : presets.light;
    setThemeColors(targetColors, isDark ? "dark" : "light");
  }, [active,theme]);
  const handleSelect = (key: string) => {
    setActive(key);
    updateSettings({ theme: key });
  };

  return (
    <div className="flex gap-4 flex-wrap justify-between items-center w-full">
      <span className=""> Color Picker</span>
      <div className="w-full flex">
        {themePresets.map((preset) => (
          <Button
            key={preset.key}
            onClick={() => handleSelect(preset.key)}
            className={cn(
              "relative size-12 scale-75 rounded-full border-2 transition-all hover:cursor-pointer hover:scale-125",
              active === preset.key
                ? "border-primary ring-2 ring-ring"
                : "border-muted"
            )}
            style={{ backgroundColor: preset.light.primary }}
          >
            {active === preset.key && (
              <Check className="absolute inset-1 text-white size-4" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
