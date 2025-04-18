import CountDown from "@/components/countdown/countDown";
import Task from "@/components/task/task";
import CircleWrapper from "@/components/wrappers/circleWrapper";
import Image from "next/image";

export default function Home() {
  // https://magicui.design/docs/components/video-text
  //https://magicui.design/docs/components/dot-pattern
  return (
    <div className="flex h-screen w-full justify-start items-center flex-col pt-10">
      <div className="bg-accent flex flex-col w-screen pb-10">
        <div className="flex justify-center items-center gap-4 p-6">
          <div>Pomodoro</div>
          <div>Break</div>
          <div>Long Break</div>
        </div>
        <CircleWrapper>
          <CountDown />
        </CircleWrapper>
      </div>

      <div className = "bg-blue-400 flex justify-center items-center w-screen h-full">
        <Task/>
      </div>
    </div>
  );
}
