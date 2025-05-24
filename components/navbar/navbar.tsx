"use client";
import React from "react";
import { motion } from "framer-motion";
import NavLogo from "../logo/NavLogo";
import SettingsDialog from "../settings/SettingsDialog";
import NavSkeleton from "../skeletons/nav-skeleton";
import SettingsTip from "../tooltips/tt-settings";

export default function NavBar() {
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() =>{
    setLoading(false);
  },[])
  
  return (
    <>
    {loading ? (<NavSkeleton/>
) 
:
(
  <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        fixed top-1 left-1/2 transform -translate-x-1/2 
        z-10 
        flex items-center justify-between 
        bg-background/80 text-foreground 
        rounded-full 
        w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
        px-4 py-2
        h-auto
      
        "
    >
      <motion.span
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm sm:text-base"
      >
        <NavLogo />
      </motion.span>

      <SettingsTip>
      <motion.span
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm sm:text-base"
      >
        <SettingsDialog/>
      </motion.span>
      </SettingsTip>
    </motion.nav>

)}
    
    </>
    
  );
}
