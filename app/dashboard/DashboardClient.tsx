"use client";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import checkForm from "@/utils/checkForm";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

const checkKolb = async () => {
  try {
    const res = await fetch("/api/user/kolb", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((fullUser) => {
        console.log("Response of KOLB:", fullUser.kolb);
        return fullUser?.kolb !== null && fullUser?.kolb !== undefined;
      });
    console.log(res);
    return res;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

const DashboardClient = ({ className, ...props }: CardProps) => {
  const [finishFirstForm, setFinishFirstForm] = useState(false);
  const [finishSecondForm, setFinishSecondForm] = useState(false);
  const [finishKolbForm, setFinishKolbForm] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const checkAllForms = async () => {
    const firstFormStatus = await checkForm(
      "10zc_emnqq3l7VvHrWXUvxnU9mRAiK90PX7zSfqKlozY",
      1806269592
    );
    setFinishFirstForm(firstFormStatus);

    const secondFormStatus = await checkForm(
      "1FYiiLRMpdpzEC-3Y47IlYEcaT-b59D5wMp5hMzu5YQY",
      1088244461
    );
    setFinishSecondForm(secondFormStatus);

    const kolbStatus = await checkKolb();
    setFinishKolbForm(kolbStatus);

    setChecked(true);
  };

  const notifications = [
    {
      title: "kolb學習風格",
      description: "/kolb",
      finish: finishKolbForm,
    },
  ];

  function redirect() {
    window.location.href = "/materials";
  }

  useEffect(() => {
    if (finishFirstForm && finishSecondForm && finishKolbForm) {
      setTimeout(() => {
        redirect();
      }, 1000);
    }
  }, [finishFirstForm, finishSecondForm, finishKolbForm]);

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>前測作業</CardTitle>
        <CardDescription>總計三項</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              {!notification.finish && !checked && (
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              )}
              {!notification.finish && checked && (
                <X className="mr-2 h-5 w-5 text-red-600" />
              )}
              {notification.finish && (
                <Check className="mr-2 h-5 w-5 text-green-600" />
              )}
              <div className="space-y-1">
                <Link
                  href={notification.description}
                  rel="noopener noreferrer"
                  target="_blank"
                >
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
          {finishFirstForm && finishSecondForm && finishKolbForm && checked ? (
            <div className="text-sm text-gray-400 px-5">
              🏅恭喜你完成前測作業的部分，讓我們前往專屬你的護理疼痛評估教材吧！
            </div>
          ) : (
            <div className="text-sm text-gray-400 px-5">
              ❌尚有未完成部分，加緊時間填完表單吧！
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between space-x-4 w-full">
        <Button className="w-1/2" onClick={() => {
          router.push('/')
        }}>
          上一頁
        </Button>
        <Button
          className="w-1/2"
          onClick={async () => {
            await checkAllForms();
            if (finishFirstForm && finishSecondForm && finishKolbForm) {
              redirect();
            }
          }}
        >
          {finishFirstForm && finishSecondForm && finishKolbForm ? (
            <>
              <Check className="mr-2 h-5 w-5 text-white-600" />
              完成
            </>
          ) : (
            "檢查"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardClient;
