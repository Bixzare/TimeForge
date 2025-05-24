import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import * as React from 'react'; 

  export default function PlayToolTip({children}:{children:React.ReactNode}){
    return(
        <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>Play</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    )
  }