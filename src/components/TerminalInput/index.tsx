import React, { useEffect, useImperativeHandle, useRef } from "react";
import Prefix from "@/components/Prefix";
import { TerminalInputProps } from "./types";
import { useAtom } from "jotai";
import { resultAtom } from "@/store";
import ParseCommand from "@/utils/parseCommand";

function TerminalInput(props: TerminalInputProps) {
  const { inputRef } = props;
  const [, setResultList] = useAtom(resultAtom);

  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    ref.current.focus();
  }, []);

  useImperativeHandle(
    inputRef,
    () => {
      return {
        focus: () => ref.current.focus(),
      };
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();

    if (e.key === "Enter" && value) {
      const parseCommand = new ParseCommand(value);
      console.log(parseCommand.parse());
    }
  };

  return (
    <div className="flex items-center">
      <Prefix />
      <input
        className="bg-transparent outline-none w-full"
        ref={ref}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default TerminalInput;
