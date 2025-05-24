import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import * as React from 'react'; 

  export default function AutoPlayTip({children}:{children:React.ReactNode}){
    return(
        <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>AutoPlay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    )
  }