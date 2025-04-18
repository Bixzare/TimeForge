"use client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import * as React from "react";
import { Button } from "../ui/button";
import { useTimeStore } from "@/app/store/timeStore";
import { toast } from "sonner";
import {
  PlayIcon,
  PauseIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { TimerReset } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MotionButton = motion.create(Button);

const renderTime = (remainingTime: number) => {
  const minutes = Math.floor(remainingTime / 60); // Calculate minutes
  const seconds = Math.round(remainingTime % 60); // Calculate seconds

  if (remainingTime === 0) {
    return <div className="timer">Complete</div>;
  }

  return (
    <div className="timer">
      <div className="value">
        {minutes > 0 && `${minutes} : `}
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default function CountDown() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const { pomadoro, setPomadoro,resetPomadoro } = useTimeStore(); // Assume `seconds` is the total duration in seconds
  const [key, setKey] = React.useState(0);

  const handleComplete = () => {
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1);
    toast("Timer complete, take a break!");
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center items-center gap-4">
        <div className ="absolute left-1/5 ">
        {/* <h1 className="text-lg bg-primary rounded-full px-2.5 text-foreground text-center my-2">
              Minutes
            </h1> */}
        <div className="flex gap-2">
        
          {/* Left column with centered TimerReset button */}
          <div className="flex-1 flex justify-center items-center ">
            <MotionButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
              }}
              whileTap={{
                scale: 0.9,
                backgroundColor: "#000000",
                color: "#155dfc",
                transition: {
                  duration: 0.1,
                },
              }}
              onClick={resetPomadoro}
              size="lg"
              className="rounded-full size-10 disabled:!opacity-50"
              disabled={pomadoro === 1200}
            >
              <TimerReset className="size-6" />
            </MotionButton>
          </div>

          {/* Right column with larger Plus and Minus buttons */}
          <div className="flex-2 flex flex-col gap-4">
            {/* Title moved inside the layout */}
            

            {/* Plus button */}
            <MotionButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
              }}
              whileTap={{
                scale: 0.9,
                backgroundColor: "#000000",
                color: "#155dfc",
                transition: {
                  duration: 0.1,
                },
              }}
              onClick={() => setPomadoro(pomadoro + 300)}
              size="lg"
              className="rounded-full size-15 disabled:!opacity-50"
              disabled={pomadoro >= 3600}
            >
              <PlusIcon className="size-10" />
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
                backgroundColor: "#000000",
                color: "#155dfc",
                transition: {
                  duration: 0.1,
                },
              }}
              onClick={() => setPomadoro(pomadoro - 300)}
              size="lg"
              className="rounded-full size-15 disabled:!opacity-50"
              disabled={pomadoro <= 300}
            >
              <MinusIcon className="size-10" />
            </MotionButton>
          </div>
        </div>
        </div>



        <motion.div
          initial={{ opacity: 0, y: 100 }} // Start fully transparent and 100px below
          animate={{ opacity: 1, y: 0 }} // Animate to fully visible and its final position
          exit={{ opacity: 0, y: 100 }} // Exit by sliding back down and fading out
          transition={{
            type: "spring", // Use spring animation
            stiffness: 100, // Controls the spring stiffness (higher = faster spring)
            damping: 10, // Controls the spring damping (lower = more bounce)
            duration: 0.5, // Optional: Sets the duration for the animation
          }}
        >
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={10}
            
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[pomadoro, pomadoro * 0.6, pomadoro * 0.3, 0]}
            size={280}
            onComplete={handleComplete}
          >
            {({ elapsedTime }) => renderTime(pomadoro - elapsedTime)}
          </CountdownCircleTimer>
        </motion.div>
      </div>

      <MotionButton
        className=" w-30 h-15 mx-auto mt-10"
        onClick={() => setIsPlaying((prev) => !prev)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
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
              className="flex justify-between items-center text-xl"
            >
              <PauseIcon className=" size-10" />
            </motion.div>
          ) : (
            <motion.div
              key="start"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-between items-center text-xl"
            >
              <PlayIcon className=" size-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </MotionButton>
    </div>
  );
}
