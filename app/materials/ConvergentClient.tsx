"use client";

import { useState } from "react";
import Link from "next/link";

const ConvergentClient = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  }

  return (
    <div className="">
      <div className="bg-slate-100 h-auto mx-5 mt-[20vh] rounded-lg shadow-lg p-5 text-center text-lg gap-10 flex flex-col">
        <div className="text-[25px]">學習教材</div>
        <p>測驗結果分析完畢，教材為投影片，請點擊下面按鈕</p>
        <a
          className="bg-slate-800 rounded-full text-slate-50 p-3 text-[20px] align-middle"
          href="https://docs.google.com/presentation/d/1rnmkybTPaBpC0O0abamDu6elBmnWnjbG/edit?usp=sharing&ouid=118412558548303170375&rtpof=true&sd=true"
          target="_blank" rel="noopener noreferrer" onClick={() => handleClick()}
        >
          前往學習教材
        </a>
        {clicked && 
          <Link className='text-sm' href='/activites'>
            已經熟讀教材？請點擊<p className="inline underline text-red-300">這裡</p>前往學習活動
          </Link>
        }
      </div>
    </div>
  );
};

export default ConvergentClient;