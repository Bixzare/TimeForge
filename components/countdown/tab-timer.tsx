"use client"
import { useTimeStore } from "@/store/timeStore";
import * as React from 'react';

const baseTitle = "Timer App"
export default function TabTimer() {
    const  { timeRemaining } = useTimeStore();

    React.useEffect(()=> {
            if (timeRemaining) {
              document.title =` ${timeRemaining} | ${baseTitle}`;
            } else {
              document.title = baseTitle;
            }
    },[timeRemaining])

    return null;
}