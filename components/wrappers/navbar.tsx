"use client";
import React from "react";
import { ThemeToggle } from "../theme/themeToggle";
import { Hammer } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

export default function NavBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration:0.4 }}
        className="flex w-[90%] left-auto mx-auto bg-foreground/20 z-10 h-10 p-2 px-4 fixed top-1 justify-between text-foreground"
      >
        <motion.span
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          TimeForge
        </motion.span>
        <motion.span
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ThemeToggle />
        </motion.span>
      </motion.nav>
      <div className="">{children}</div>

    </>
  );
}
