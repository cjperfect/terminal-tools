import { useRef } from "react";
import TerminalInput from "@/components/TerminalInput";
import TerminalResult from "@/components/TerminalResult";
import Prefix from "@/components/Prefix";
import { Icon } from "@iconify/react";
import { InputRefProps } from "./types";

function Home() {
  const inputRef = useRef<InputRefProps>();

  const terBodyRef = useRef<HTMLDivElement>();

  // 点击body自动聚焦输入框
  const handleTerBodyClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="w-full h-full px-3 py-3 overflow-hidden boxs flex flex-col shadow-2xl">
      <div className="bg-[#e8e8e8] h-[32px] px-4 py-4 flex justify-start items-center rounded-t-lg">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
      </div>
      <div
        className="bg-[#1e1e1e] px-5 py-5 h-[calc(100%_-_42px)] overflow-y-auto tracking-widest scroll-smooth"
        onClick={handleTerBodyClick}
        ref={terBodyRef}
      >
        <div className="flex items-center ">
          <Prefix />
          请输入help
          <Icon icon="openmoji:package" width="32" height="32" />
          获取所有指令
        </div>

        <TerminalResult />

        <TerminalInput inputRef={inputRef} />
      </div>
    </div>
  );
}

export default Home;
