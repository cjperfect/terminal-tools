import React, { useEffect, useImperativeHandle, useRef } from "react";
import Prefix from "@/components/Prefix";
import { TerminalInputProps } from "./types";
import { useAtom } from "jotai";
import { resultAtom } from "@/store";
import ParseUtil from "@/utils/parseUtil";

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
      const { cmd, base, params, action } = ParseUtil.parse(value);
      setResultList((prev) => {
        return [...prev, { cmd, base, params, action, key: +new Date() + "" }];
      });
      target.value = "";
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
