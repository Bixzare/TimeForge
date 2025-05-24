"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark");
  const themeText = isDark ? "Dark" : "Light";

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`flex justify-center items-center p-1 rounded-full transition-transform hover:scale-105 hover:cursor-pointer ${
          isDark
            ? "hover:!bg-white hover:!text-black"
            : "hover:!bg-black hover:!text-white"
        }`}
        variant="outline"
      >
        {isDark ? (
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        )}

        <span className="text-sm font-medium ml-2">{themeText} Mode</span>
      </Button>
    </div>
  );
}