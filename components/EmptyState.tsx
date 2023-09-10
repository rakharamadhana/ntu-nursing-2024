'use client';

import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  button?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  button
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="pt-5">
        {button && 
          <Button className="w-[150px] text-lg" size="lg" onClick={() => router.push("/")}>
          回首頁
          </Button>
        }
      </div>
    </div>
   );
}
 
export default EmptyState;