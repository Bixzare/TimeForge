import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import SettingsNav from "./Settings";
import { ThemeToggle } from "../theme/themeToggle";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";
import { useToggleSlider } from "react-toggle-slider";
import { ToggleSlider } from "react-toggle-slider";
import { Input } from "../ui/input";
import React from "react";
import { modes } from "@/lib/modes";
import { Separator } from "@/components/ui/separator";
import { useTimeStore } from "@/store/timeStore";
import { ThemePicker } from "../theme/theme-picker";
import { toast } from "sonner";
import { Play, Bell } from "lucide-react";
import { usePomodoroStateStore } from "@/store/pomodoroStateStore";
import { Button } from "../ui/button";

export default function SettingsDialog() {
  const { settings, updateSettings } = useSettingsStore();
  const {
    pomodoro,
    setPomodoro,
    break: Break,
    setBreak,
    longBreak,
    setLongBreak,
  } = useTimeStore();
  const {pomodoroCounter,setPomodoroCounter} = usePomodoroStateStore();

  const handlePomodoroChange = (key: string, value: string) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      switch (key) {
        case "pomodoro":
          setPomodoro(numericValue * 60); // Convert minutes to seconds
          break;
        case "break":
          setBreak(numericValue * 60); // Convert minutes to seconds
          break;
        case "longBreak":
          setLongBreak(numericValue * 60); // Convert minutes to seconds
          break;
        default:
          break;
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <SettingsNav />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95dvw] max-h-[95dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary scrollbar-track-transparent rounded-lg">
        <DialogHeader>
          <DialogTitle>
            Settings
            <Separator className="my-4 py-0.5" />
          </DialogTitle>
          <DialogDescription className="hidden">App Settings</DialogDescription>
        </DialogHeader>
        <div className="flex  max-w-[85dvw] flex-col gap-4 size-full font-semibold">
          <span className="text-lg text-center">Timer</span>
          <span className="flex w-full gap-4 flex-col md:flex-row">
            {Object.entries(modes).map(([key, label]) => (
              <div
                key={key}
                className="flex flex-col justify-center md:items-center gap-2"
              >
                <div className="">
                  {label}
                  <p className="text-sm text-foreground/50 inline"> (Min)</p>
                </div>
                <Input
                  type="number"
                  className="rounded-full"
                  placeholder={`${label} min`}
                  defaultValue={
                    key === "pomodoro"
                      ? pomodoro / 60
                      : key === "break"
                      ? Break / 60
                      : longBreak / 60
                  } // Display current value in minutes
                  onBlur={(e) => handlePomodoroChange(key, e.target.value)}
                  min="1"
                  max="999"
                />
              </div>
            ))}
          </span>
          <span className="flex items-center mt-2 justify-between pr-2">
            <p className="mr-2">Auto Start</p>
            <ToggleSlider
            active={settings.autoplay}
              onToggle={(state) => {
                updateSettings({ autoplay: state });
                if (state) {
                  toast(
                    <div className="flex justify-center items-center">
                      <Play className="inline mr-2" /> AutoPlay Enabled
                    </div>
                  );
                }
              }}
            />
          </span>
          <span className="flex items-center mt-2 justify-between pr-2">
            <p className="mr-2">Pomodoro Interval ({pomodoroCounter})</p>
            <Input
            type="range"
            className="rounded-full max-w-40 bg-primary"
            placeholder="# of Intervals"
            defaultValue={pomodoroCounter}
            min={1}
            max={10}
            onChange={(e)=> setPomodoroCounter(Number(e.target.value))}
            />

          </span>
          <Separator className="my-4" />
          <span className="text-lg text-center">Sounds</span>
          <span className="flex items-center justify-between pr-2">
            <p className="mr-2">Sound Enabled</p>
            <ToggleSlider                
            active={settings.sound}
              onToggle={(state) => {
                updateSettings({ sound: state });
                if (state) {
                  toast(
                    <div className="flex justify-center items-center">
                      <Bell className="inline mr-2" /> Sound enabled
                    </div>
                  );
                }
              }}
            />
          </span>
          <Separator className="my-4" />
          <span className="text-lg text-center">Theme</span>
          <span className="flex flex-col justify-center gap-4 w-full">
            <ThemeToggle />
            <ThemePicker />
          </span>
          <Separator className="my-4" />
          <span className="text-lg text-center">Notification</span>
          <span className="flex items-center justify-between pr-2">
            <p className="mr-2">Notifications</p>
            <ToggleSlider                
            active={settings.notificationEnabled}
              onToggle={(state) => {
                updateSettings({ notificationEnabled: state });
                if (state) {
                  toast(
                    <div className="flex justify-center items-center">
                      <Bell className="inline mr-2" /> Notifications Enabled
                    </div>
                  );
                }
              }}
            />
          </span>
          <Separator className="my-4" />

          <DialogClose asChild><Button className = "hover:scale-105 hover:opacity-80 font-bold">Confirm</Button></DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
