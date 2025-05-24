"use client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import * as React from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import CircleWrapper from "@/components/wrappers/circleWrapper";
import { getTimeValue } from "@/lib/mapValue";
import { useWindowSize } from "@/usehooks-ts/useWindowSize";
import PlayControl from "./playControl";
import { useTimeStore } from "@/store/timeStore";
import { useSettingsStore } from "@/store/settingsStore";
import { usePomodoroStateStore } from "@/store/pomodoroStateStore";
import { sendNotification } from "@/lib/notification";
import { modes } from "@/lib/modes";

const renderTime = (remainingTime: number) => {
  const { timeRemaining, setTimeRemaining } = useTimeStore();
  const minutes = Math.floor(remainingTime / 60); // Calculate minutes
  const seconds = Math.round(remainingTime % 60); // Calculate seconds

  React.useEffect(() => {
    setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`);
  }, [minutes, seconds]);

  if (remainingTime === 0) {
    return (
      <div className="timer animate animate-bounce text-3xl md:text-4xl lg:text-5xl">
        Complete
      </div>
    );
  }

  return (
    <div className=" z-10 timer text-3xl md:text-5xl lg:text-7xl font-bold !text-primary-foreground">
      {minutes > 0 && `${minutes} : `}
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default function CountDown({ mode }: { mode: string }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const pomodoro = getTimeValue(mode); // Get the current time value based on mode
  const [timerSize, setTimerSize] = React.useState<number>(120);
  const [key, setKey] = React.useState(0);
  const { width } = useWindowSize();
  const { settings } = useSettingsStore();
  const { pomodoroState, setPomodoroState, pomodoroCounter } =
    usePomodoroStateStore();
  const [complete, setComplete] = React.useState(false);
  const hasMounted = React.useRef(false);
  const { interval, setInterval } = useTimeStore();

  React.useEffect(() => {
    const getTimerSize = () => {
      if (width < 480) return 120; // Mobile
      if (width < 768) return 180; // Tablet
      if (width < 1024) return 220; // Small desktop
      return 260; // Large desktop
    };
    const timerSizeValue: number = getTimerSize();
    console.log(timerSize);

    setTimerSize(timerSizeValue);
  }, [width]);

  React.useEffect(() => {
    console.log("interval", interval);
  }, [interval]);

  React.useEffect(() => {
    // if (!hasMounted.current) {
    //   hasMounted.current = true; // Set the flag to true after the first render
    //   return; // Skip the first render
    // }
    if (settings.autoplay && complete) {
      console.log("Pomodoro state changed:", pomodoroState);
      setTimeout(() => setIsPlaying(true), 1000);
    }
  }, [complete]);

  function getNextState() {
    if (pomodoroState === "pomodoro") {
      return "break";
    } else if (pomodoroState === "break") {
      setInterval(interval + 1);
      if (interval >= pomodoroCounter) {
        return "longBreak";
      }
      return "pomodoro";
    } else if (pomodoroState === "longBreak") {
      return "pomodoro";
    }
  }

  // function intervalAdjust(){

  React.useEffect(() => {
    // isPlaying howler sound
    console.log(isPlaying);
  }, [isPlaying]);

  // }
  const handleComplete = () => {
    setComplete(true);
    setIsPlaying(false); // pause
    
    // setKey((prevKey) => prevKey + 1); // reset timer
    toast(`Timer complete ${pomodoroState} Complete`);
    sendNotification("Time's up!");

    // howler sound when complete

    if (settings.autoplay) {
      const nextState = getNextState();
      console.log("Next state:", nextState);

      setPomodoroState(nextState as string);
      setKey((prevKey) => prevKey + 1);

      // const autoPlay = setTimeout(()=>{

      // },2000);

      // return () => clearTimeout(autoPlay)
      // wait a second or 2 then start playing with the new state for true autoplay
      // useEFfect to handle isPlaying
    }
    // setPomodoroState()
  };
  const handleUpdate = (elapsedTime: number) => {
    const minutes = Math.floor(elapsedTime / 60); // Calculate minutes
    const seconds = Math.round(elapsedTime % 60); // Calculate seconds

    console.log(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    document.title = `Time Remaining: ${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    //   React.useEffect(() => {
    //   // Update the document title with the current timeRemaining
    //   const intervalId = setInterval(() => {
    //     const { timeRemaining } = useTimeStore.getState(); // Access the latest state directly
    //     const temp = `${minutes}:${seconds.toString().padStart(2, "0")}`
    //     document.title = `Time Remaining: ${temp}`;
    //   }, 1000); // Update every second

    //   return () => clearInterval(intervalId); // Cleanup the interval on unmount
    // }, []);
  };

  return (
    <div className="flex justify-center flex-col w-auto">
      <div className="flex justify-center items-center  flex-col">
        <motion.div
          initial={{ opacity: 0, y: width < 768 ? 50 : 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: width < 768 ? 50 : 100 }}
          transition={{
            type: "spring", // Use spring animation
            stiffness: 100, // Controls the spring stiffness (higher = faster spring)
            damping: 10, // Controls the spring damping (lower = more bounce)
            duration: 0.5, // Optional: Sets the duration for the animation
          }}
          className="relative"
        >
          <CircleWrapper>
            {/**size={timerSize} */}
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={1}
              colors={["#1f52a3", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[pomodoro, pomodoro * 0.6, pomodoro * 0.3, 0]}
              size={timerSize}
              strokeWidth={timerSize / 20}
              onComplete={handleComplete}
              onUpdate={handleUpdate}
            >
              {({ elapsedTime }) => renderTime(pomodoro - elapsedTime)}
            </CountdownCircleTimer>
          </CircleWrapper>
        </motion.div>

        <PlayControl
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          complete={complete}
          setComplete={setComplete}
          setKey={setKey}
        />
      </div>
    </div>
  );
}
