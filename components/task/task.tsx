"use client";
import * as React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '../ui/textarea';
import { useTaskStore } from '@/app/store/taskStore';

export default function Task(){
    const {task,setTask} = useTaskStore();


    React.useEffect(() =>{
        console.log(task)
    },[task]) // debounce state update using debounce from
    return(

        <motion.div>
            
            <Textarea placeholder="Task"
            value={task}
            onChange={(e)=> setTask(e.target.value)}
            className = "w-[80vw] h-[40vh]" />
        </motion.div>
    )
}