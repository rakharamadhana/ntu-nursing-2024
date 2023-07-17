"use client";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import checkForm from "@/utils/checkForm";

const ReflectiveFormClient = () => {
  const [checked, setChecked] = useState(false);
  const [finish, setFinish] = useState(false);

  const redirect = () => {
    window.location.href = "/backtest";
  };

  const handleCheck = async () => {
    const formStatus = await checkForm(
      "1Jo30GTrXXK4ptPG-GPewGMOZeXhV8aGf_yAg6mZQW6g",
      1326342758
    );
    setFinish(formStatus);
    setChecked(true);
  };

  useEffect(() => {
    if (finish) {
      setTimeout(() => {
        redirect();
      }, 1000);
    }
  }, [finish]);

  return (
    <div className="flex justify-center">
      <div className=" bg-slate-50 h-auto mt-[20vh] rounded-lg shadow-lg p-5 text-center text-lg gap-5 flex flex-col">
        <div className="text-[25px]">學習活動</div>
        <p>接下來活動為反思表單之填寫</p>
        <div className="px-12">
          <div className="mb-4 grid grid-cols-[25px_1fr] items-center pb-4 last:mb-0 last:pb-0">
            {!finish && !checked && (
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            )}
            {!finish && checked && <X className="mr-2 h-5 w-5 text-red-600" />}
            {finish && <Check className="mr-2 h-5 w-5 text-green-600" />}
            <div className="space-y-1">
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfbueXrEvQZT140iX2Qwp4tPqYYPsqTffvShbjn1fTiEVkFRw/viewform" rel="noopener noreferrer" target="_blank">
                <p className="text-sm font-medium leading-none">反思表單連結</p>
                <p className="text-sm text-muted-foreground">
                  依照表單指示完成
                </p>
              </Link>
            </div>
          </div>
        </div>
        {finish ? (
          <div
            className="bg-slate-800 rounded-full text-slate-50 p-2 text-md align-middle mx-[60px] cursor-pointer"
            onClick={() => redirect()}
          >
            完成
          </div>
        ) : (
          <div
            className="bg-slate-800 rounded-full text-slate-50 p-2 text-md align-middle mx-[60px] cursor-pointer"
            onClick={() => handleCheck()}
          >
            檢查
          </div>
        )}
      </div>
    </div>
  );
};

export default ReflectiveFormClient;
