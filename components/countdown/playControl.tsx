"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { PlayIcon, PauseIcon, ForwardIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";
import PlayToolTip from "../tooltips/tt-play";
import AutoPlayTip from "../tooltips/tt-autoplay";

const MotionButton = motion.create(Button);

export default function PlayControl({
  isPlaying,
  setIsPlaying,
  complete,
  setComplete,
  setKey,
}: {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  complete: boolean;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { settings, updateSettings } = useSettingsStore();
  const [reset, setReset] = React.useState(true);

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1); // Update the key to force a re-render of the timer
    setIsPlaying(false); // Stop the timer
    setComplete(false); // reset complete
    setReset(false);
  };

 
  return (
    <div className="grid grid-cols-3 items-center gap-4 w-full mt-2">
      {/* Left slot */}
      <div className="flex justify-end">
        {complete && reset && (
          <MotionButton
            className="ml-auto"
            onClick={handleReset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Reset
          </MotionButton>
        )}
        {!complete && <div className="w-10"></div>}
      </div>

      {/* Center slot - play/pause button always centered */}
      <PlayToolTip>
        <div className="flex justify-center">
          <MotionButton
            className="p-2 w-16 h-12 md:w-20 md:h-15 lg:w-24 lg:h-18 rounded-full hover:cursor-pointer disabled:!opacity-50"
            onClick={() => {
              setIsPlaying((prev) => !prev);
              setReset(true);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            disabled={complete && reset}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center items-center"
                >
                  <PauseIcon className="size-10" />
                </motion.div>
              ) : (
                <motion.div
                  key="start"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center items-center"
                >
                  <PlayIcon className="size-10" />
                </motion.div>
              )}
            </AnimatePresence>
          </MotionButton>
        </div>
      </PlayToolTip>

      {/* Right slot */}
      <div className="flex justify-start">
        {isPlaying ? (
          <AutoPlayTip>
            <MotionButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${
                settings.autoplay ? "animate-pulse" : ""
              } hover:scale-105`}
              onClick={() => updateSettings({ autoplay: !settings.autoplay })}
            >
              <ForwardIcon className="size-10" />
            </MotionButton>
          </AutoPlayTip>
        ) : (
          <div className="w-10"></div>
        )}
      </div>
    </div>
  );
}
