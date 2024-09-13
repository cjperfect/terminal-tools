import React, { useEffect, useImperativeHandle, useRef } from "react";
import Prefix from "@/components/Prefix";
import { TerminalInputProps } from "./types";
import { useAtom } from "jotai";
import { resultAtom } from "@/store";
import ParseUtil from "@/utils/parseUtil";
import { getList } from "@/services/list";
import { getJson } from "@/services/json";
import { CMDHELP } from "@/constants";

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

  const getData = async (obj: Omit<CmdProps, "key">) => {
    const { cmd, base, params, action } = obj;

    const map = {
      "get list": getList,
      "get json": getJson,
      help: CMDHELP,
    };

    const newItem: CmdProps = {
      cmd,
      base,
      params,
      action,
      key: +new Date() + "",
      content: null,
    };

    if (typeof map[cmd] === "function") {
      const { data } = await map[cmd](params);
      newItem.content = JSON.stringify(data, null, 2);
    } else {
      if (!map[cmd]) newItem.content = map[cmd];
    }

    setResultList((prev) => {
      return [...prev, newItem];
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();

    if (e.key === "Enter" && value) {
      const parseRes = ParseUtil.parse(value);
      getData(parseRes);
      target.value = "";
      // 内容区域，自动滚动到最底部
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
