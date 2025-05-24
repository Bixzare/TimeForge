"use client";
import * as React from "react";
import CountDown from "@/components/countdown/countDown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePomodoroStateStore } from "@/store/pomodoroStateStore";
import TimerControl from "../countdown/timerControl";
import { modes } from "@/lib/modes";
import TabsSkeleton from "../skeletons/tabs-skeleton";
import { useTimeStore } from "@/store/timeStore";

export default function TabsMain() {
  const [loading, setLoading] = React.useState(true);

  const { pomodoroState, setPomodoroState, pomodoroCounter } = usePomodoroStateStore();
  const { interval, setInterval} = useTimeStore();
  

  React.useEffect(() => {
    console.log(pomodoroState);
    setLoading(false);
  }, [pomodoroState]);

  return (
    <>
      {loading ? (
        <TabsSkeleton />
      ) : (
        <Tabs
          value={pomodoroState} // Use pomodoroState as the active tab value
          onValueChange={(value) => setPomodoroState(value)} // Update pomodoroState when the tab changes
          className="flex max-w-[80vw] mx-auto"
        >
          <div>
            <TabsList className="flex flex-row h-full  w-full  justify-center md:justify-between items-center gap-2 bg-transparent">
              {Object.entries(modes).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="py-4 md:py-2  text-center rounded-full text-lg md:text-2xl data-[state=active]:!bg-primary/80 data-[state=active]:!text-foreground hover:!bg-primary/50 hover:!text-foreground hover:scale-105 hover:cursor-pointer "
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="w-fit h-full max-w-[80vw] mx-auto py-2 px-4 mt-4 flex flex-col items-center md:flex-row gap-4 bg-primary/20 rounded-xl">
            {/* Left Placeholder Element */}
            <div className="w-full md:h-full md:w-[200px] flex-shrink-0 flex justify-center md:justify-start order-2 md:order-1">
              <div className="w-full h-full bg-grey rounded-md flex items-center justify-center">
                {/* Placeholder content */}
                <TimerControl mode={pomodoroState} />
              </div>
            </div>

            {/* Center Content */}
            <div className="flex-1 min-w-0 flex justify-center items-center order-1 md:order-2">
              {Object.entries(modes).map(([key]) => (
                <TabsContent
                  key={key}
                  value={key}
                  className="w-full flex justify-center items-center"
                >
                  <CountDown mode={key} />
                </TabsContent>
              ))}
            </div>

            {/* Right Side Tabs */}
            <div className="w-full md:w-[200px] flex-shrink-0 flex justify-center md:justify-end order-3 rounded-md h-full self-auto">
              <div className="flex flex-row md:flex-col w-full h-fit md:h-full justify-center md:justify-around items-center gap-1 bg-transparent">
                <h1 className ="text-3xl">Interval until long break</h1>
                <h1>{interval}/{pomodoroCounter}</h1>
              </div>
            </div>
          </div>
        </Tabs>
      )}
    </>
  );
}
