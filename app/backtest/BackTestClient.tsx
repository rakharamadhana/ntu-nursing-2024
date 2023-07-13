'use client';
import { Check, X } from "lucide-react"
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
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import checkForm from "@/utils/checkForm";

type CardProps = React.ComponentProps<typeof Card>

const BackTestClient = ({ className, ...props }: CardProps) => {
  const [finishFirstForm, setFinishFirstForm] = useState(false);
  const [finishSecondForm, setFinishSecondForm] = useState(false);
  const [finishThirdForm, setFinishThirdForm] = useState(false);
  const [kolb, setKolb] = useState('');
  const [checked, setChecked] = useState(false);
  const { data: session } = useSession();

  const checkAllForms = async () => {

    // const firstFormStatus = await checkForm('10zc_emnqq3l7VvHrWXUvxnU9mRAiK90PX7zSfqKlozY', 1806269592);
    setFinishFirstForm(true);

    const secondFormStatus = await checkForm('11e8by4T9867enL7FHH_-inZF-6jOp0RiNVdFC40I_bY', 256080489);
    setFinishSecondForm(secondFormStatus);

    const thirdStatus = await checkForm('1zUphburapJepFt5ID7xPQBWDS-cNUq2Oy-E3HdTbq7Q', 282545185);
    setFinishThirdForm(thirdStatus);

    setChecked(true);
  };

  const notifications = [
    {
      title: "疼痛評估題目(後測)",
      description: "https://forms.gle/1xeovHvLshEN3mrC8",
      finish: finishFirstForm,
    },
    {
      title: "學習動機(後測)",
      description: "https://forms.gle/fk1PyRcuRGGFtSaz8",
      finish: finishSecondForm,
    },
    {
      title: "課程滿意度",
      description: "https://forms.gle/zdWTnWTRMK3pWRAh9",
      finish: finishThirdForm,
    },
  ]

  function redirect() {
    window.location.href = '/finish';
  }

  useEffect(() => {
    if (finishFirstForm && finishSecondForm && finishThirdForm) {
      setTimeout(() => {
        redirect();
      }, 1000);
    }
  }, [finishFirstForm, finishSecondForm, finishThirdForm]);

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>後測作業</CardTitle>
        <CardDescription>總計三項</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              {(!notification.finish && !checked) && <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />}
              {(!notification.finish && checked) && <X className="mr-2 h-5 w-5 text-red-600" />}
              {notification.finish && <Check className="mr-2 h-5 w-5 text-green-600" />}
              <div className="space-y-1">
                <Link href={notification.description}>
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </Link>
              </div>
            </div>
          ))}
          {(finishFirstForm && finishSecondForm && finishThirdForm) ? 
          <div className="text-sm text-gray-400 px-5">🏅恭喜你完成課程</div> 
          : <></>
          }     
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={async () => {
            await checkAllForms();
            if (finishFirstForm && finishSecondForm && finishThirdForm) {
              redirect();
            }
          }}>
          {(finishFirstForm && finishSecondForm && finishThirdForm) ? 
            <>
              <Check className="mr-2 h-5 w-5 text-white-600" />
              完成
            </> 
            : 
            '檢查'
          }
        </Button>
      </CardFooter>
    </Card>
  )
};

export default BackTestClient;