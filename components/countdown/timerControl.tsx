"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { TimerReset } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getTimeValue,
  getSetterFunction,
  getResetFunction,
} from "@/lib/mapValue";

const MotionButton = motion.create(Button);

export default function TimerControl({ mode }: { mode: string }) {
  const pomodoro = getTimeValue(mode); // Get the current time value based on mode
  const setPomodoro = getSetterFunction(mode); // Get the setter function based on mode
  const resetPomodoro = getResetFunction(mode); // Get the reset function based on mode

  return (
    <div className="flex flex-row-reverse md:flex-row justify-center items-center w-full h-full gap-4">
      {/* Left column with centered TimerReset button */}
      <div className="flex justify-center items-center w-auto">
        <MotionButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
          }}
          whileTap={{
            scale: 0.9,
            transition: {
              duration: 0.1,
            },
          }}
          onClick={resetPomodoro}
          size="lg"
          className="p-2 rounded-full size-10 md:size-12 disabled:bg-primary/40 disabled:!cursor-not-allowed"
          disabled={
            (pomodoro === 1200 && mode === "pomodoro") ||
            (pomodoro === 300 && mode === "break") ||
            (pomodoro === 900 && mode === "longBreak")
          }
        >
          <TimerReset className="size-6 md:size-8" />
        </MotionButton>
      </div>

      {/* Right column with larger Plus and Minus buttons */}
      <div className="flex flex-row md:flex-col gap-4 justify-center items-center">
        {/* Plus button */}
        <MotionButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
          }}
          whileTap={{
            scale: 0.9,
            transition: {
              duration: 0.1,
            },
          }}
          onClick={() => setPomodoro(pomodoro + 300)}
          size="lg"
          className="rounded-full size-12 md:size-15 disabled:!opacity-50"
          disabled={pomodoro >= 3600}
        >
          <PlusIcon className="size-8 md:size-10" />
        </MotionButton>

        {/* Minus button */}
        <MotionButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
          }}
          whileTap={{
            scale: 0.9,

            transition: {
              duration: 0.1,
            },
          }}
          onClick={() => setPomodoro(pomodoro - 300)}
          size="lg"
          className="rounded-full size-12 md:size-15 disabled:!opacity-50"
          disabled={pomodoro <= 300}
        >
          <MinusIcon className="size-8 md:size-10" />
        </MotionButton>
      </div>
    </div>
  );
}
