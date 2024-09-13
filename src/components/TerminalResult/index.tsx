import { useAtom } from "jotai";
import { TerminalResultProps } from "./types";
import { resultAtom } from "@/store";
import ResultItem from "./ResultItem";

const TerminalResult: React.FC<TerminalResultProps> = () => {
  const [resultList] = useAtom(resultAtom);

  return (
    <div>
      {resultList.map(({ cmd, base, params, action, key, content }) => {
        return (
          <ResultItem
            cmd={cmd}
            action={action}
            base={base}
            params={params}
            key={key}
            content={content}
          />
        );
      })}
    </div>
  );
};

export default TerminalResult;
