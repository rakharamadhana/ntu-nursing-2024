"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const getMobileOS = () => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      "ontouchstart" in window ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return "iOS";
    }
  }
  return "Other";
};

const DivergentClient = () => {
  const [os, setOs] = useState("Other");
  const [clicked, setClicked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setOs(getMobileOS());
  }, []);

  const handleClick = () => {
    setClicked(true);
  };

  if (os == "iOS") {
    return (
      <div className="flex justify-center">
        <div className="bg-slate-100 h-auto mx-5 mt-[20vh] rounded-lg shadow-lg p-5 text-center text-lg gap-10 flex flex-col">
          <p>測驗結果分析完畢，教材為VR影片，請點擊下面按鈕</p>
          <a
            className="bg-slate-800 rounded-full text-slate-50 p-3 text-[20px] align-middle"
            href="https://m.me/460286867158768?ref=VR"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            前往學習教材
          </a>
          {clicked && (
            <div className="flex flex-col items-center">
              <Link className="text-sm" href="/activities">
                已經熟讀教材？請點擊
                <p className="inline underline text-red-300">這裡</p>前往學習活動
              </Link>
              <Button className="w-1/2 mt-5" onClick={() => {
                  router.push('/dashboard')
              }}>
                上一頁
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <div className="bg-slate-100 h-auto mx-5 mt-[20vh] rounded-lg shadow-lg p-5 text-center text-lg gap-10 flex flex-col">
          <div className="text-[30px]">學習教材</div>
          <p>測驗結果分析完畢，教材為VR影片，請點擊下面按鈕</p>
          <a
            className="bg-slate-800 rounded-full text-slate-50 p-3 text-[20px] align-middle"
            href="https://m.me/460286867158768?ref=VR"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick()}
          >
            前往學習教材
          </a>
          {clicked && (
            <div className="flex flex-col items-center">
              <Link className="text-sm" href="/activities">
                已經熟讀教材？請點擊
                <p className="inline underline text-red-300">這裡</p>前往學習活動
              </Link>
              <Button className="w-1/2 mt-5" onClick={() => {
                  router.push('/dashboard')
              }}>
                上一頁
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default DivergentClient;