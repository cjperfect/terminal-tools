import { useAtom } from "jotai";
import Prefix from "../Prefix";
import { TerminalResultProps } from "./types";
import { resultAtom } from "@/store";
import ResultProcess from "../ResultProcess";

const TerminalResult: React.FC<TerminalResultProps> = () => {
  const [resultList] = useAtom(resultAtom);

  return (
    <div>
      {resultList.map(({ cmd, action }) => {
        return (
          <div>
            <div className="flex items-center">
              <Prefix />
              <span className="text-cyan-300">{cmd}</span>
            </div>

            <ResultProcess action={action} cmd={cmd} />
          </div>
        );
      })}
    </div>
  );
};

export default TerminalResult;
