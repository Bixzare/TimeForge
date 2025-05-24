import { Settings } from "lucide-react"
import { motion } from 'framer-motion';

export default function SettingsNav(){
    return(
            <motion.div
        className = "hover:scale-125 hover:cursor-pointer p-1 rounded-full flex justify-center items-center hover:bg-primary hover:text-white">
            <Settings className = "size-[1.2rem]"/>
        </motion.div>
 
     )      
}