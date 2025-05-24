"use client";
import * as React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '../ui/textarea';
import { useTaskStore } from '@/store/taskStore';
import { toast } from 'sonner';
import { debounce } from 'lodash';
import TaskSkeleton from '../skeletons/task-skeleton';
import { playTimerCompleteSound } from '@/sounds/complete';

export default function Task(){
    const {task,setTask} = useTaskStore();
    const [loading, setLoading] = React.useState(true);
    const handleSave = (e: string) => {
        setTask(e);
        // debounce(toast("Task saved"),200)
    }

    React.useEffect(() =>{

        setLoading(false);
    },[]) // debounce state update using debounce from
    return(
        <>
        {loading ? (<TaskSkeleton/>)
        :
        (<div className = "flex w-full flex-col justify-center items-center">
            <motion.span
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}} 
            className = "text-3xl font-fold">
                Task
            </motion.span>

            {/* <div onClick={playTimerCompleteSound} className ="text-xl bg-red-500 p-2 hover:cursor-pointer">Sound</div> */}

            <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}} 
            className="p-1  min-w-[90vw] md:min-w-[50vw] max-w-[90vw] lg:max-w-[60vw]
            border-primary border  justify-center   h-full bg-primary/40 rounded-xl">
            
                <Textarea placeholder="Current task"
                value={task}
                onChange={(e)=> handleSave(e.target.value)}
                className = " p-2 text-white !bg-primary/80 !text-md md:!text-lg lg:!text-xl overflow-y-auto max-h-[40dvh] scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-primary scrollbar-track-transparent min-h-64" />
            </motion.div>
            </div>)}
        </>
        
        
        
    )
}