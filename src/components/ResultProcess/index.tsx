import { useMemo } from "react";
import { ResultProcessProps } from "./types";
import { CMDHELP, SPLIT_CHAR } from "@/constants";

const ResultProcess: React.FC<ResultProcessProps> = (props) => {
  const { cmd, action } = props;

  const processResult = useMemo(() => {
    if (cmd.toLocaleLowerCase() === "help") {
      return (
        <div>
          {CMDHELP.map((inst, index) => {
            const [text, tipText] = inst.split(SPLIT_CHAR);
            return (
              <div key={index} className="flex items-center px-2">
                <span className="w-[50%]">{text}</span>
                <span>{tipText}</span>
              </div>
            );
          })}
        </div>
      );
    }
  }, [cmd]);

  return <div>{action === "HELP" ? processResult : null}</div>;
};

export default ResultProcess;
