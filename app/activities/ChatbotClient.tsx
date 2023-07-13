"use client";

import { useState } from "react";
import Link from "next/link";

const ChatbotClient = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  }

  return (
    <div className="">
      <div className="bg-slate-50 h-auto mx-5 mt-[20vh] rounded-lg shadow-lg p-5 text-center text-lg gap-10 flex flex-col">
        <div className="text-[25px]">學習活動</div>
        <p>接下來活動為messenger聊天機器人互動環節，準備好後就開始囉！</p>
        <a
          className="bg-slate-800 rounded-full text-slate-50 p-3 text-[20px] align-middle"
          href="https://m.me/108304355624255?ref=Website"
          target="_blank" rel="noopener noreferrer" onClick={() => handleClick()}
        >
          😁開始
        </a>
        {clicked && 
          <Link className='text-sm' href='/backtest'>
            已經完成？請點擊<p className="inline underline text-red-300">這裡</p>前往後測作業
          </Link>
        }
      </div>
    </div>
  );
};

export default ChatbotClient;
