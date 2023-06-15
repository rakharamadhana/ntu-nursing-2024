'use client';
import { BellRing, Check } from "lucide-react"
import Link from "next/link";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const notifications = [
  {
    title: "疼痛評估題目",
    description: "https://forms.gle/3MUZmibWJQjWCLEp6",
  },
  {
    title: "學習動機",
    description: "https://forms.gle/MupnNhhoXsN4zEgR8",
  },
  {
    title: "kolb學習風格",
    description: "/kolb",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function DashboardClient({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>前測</CardTitle>
        <CardDescription>總計三項</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                    <Link href={notification.description}>
                        {notification.description}
                    </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => {}}>
          <Check className="mr-2 h-4 w-4" /> 完成
        </Button>
      </CardFooter>
    </Card>
  )
}

