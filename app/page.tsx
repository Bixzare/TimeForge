import Task from "@/components/task/task";
import TabsMain from "@/components/tabs/tab-main";


export default function Home() {
  // https://magicui.design/docs/components/video-text
  //https://magicui.design/docs/components/dot-pattern
  return (
    <div className="flex h-screen w-screen justify-start items-center flex-col p-2">
      <div className="flex flex-col w-full rounded-xl  px-2 mt-14  ">
        
          <TabsMain />
          
          <Task />
      </div>
    </div>
  );
}
