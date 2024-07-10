'use client'

import { Progress } from "@radix-ui/react-progress";
import { CheckCircle2Icon, DollarSignIcon } from "lucide-react";

type ProgressProps = {
  progress?: number;
}

const SimulatorProgress = ({ progress }: ProgressProps) => {
  return (
    <div className="flex items-center border-b-[1px] p-4">
      <CheckCircle2Icon
        className="mr-4 text-highlight"
        size="icon"
        width={32}
        height={32}
      />
      <Progress value={progress} />

      <DollarSignIcon
        className="ml-4 rounded-[100%] border-[2px] text-[#E5E5E7]"
        size="icon"
        width={32}
      />
    </div>
  );
}

export default SimulatorProgress;