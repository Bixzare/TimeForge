import { Hammer } from "lucide-react";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/settingsStore";

export default function NavLogo() {
  const { settings } = useSettingsStore();

  return (
    <motion.div className="flex justify-center items-center text-xl">
      <Hammer className="text-primary" fill="black" />
      <motion.span className="ml-0.5 text-center">Timeforge</motion.span>
    </motion.div>
  );
}
