import { useMemo } from "react";
import Prefix from "../Prefix";
import { CMDHELP, SPLIT_CHAR } from "@/constants";

const ResultItem: React.FC<CmdProps> = (props) => {
  const { cmd, action } = props;

  const renderContent = useMemo(() => {
    if (action === "HELP") {
      if (cmd === "help") {
        return CMDHELP.map((inst, index) => {
          const [text, tipText] = inst.split(SPLIT_CHAR);
          return (
            <div key={index} className="flex items-center px-2">
              <span className="w-[50%]">{text}</span>
              <span>{tipText}</span>
            </div>
          );
        });
      }

      // 测试数据
      if (cmd === "get list") {
        return (
          <pre>{JSON.stringify(["hello", "world", "good", "morning"])}</pre>
        );
      }
    }

    return null;
  }, [action, cmd]);

  return (
    <>
      <div className="flex items-center">
        <Prefix />
        <span className="text-cyan-300">{cmd}</span>
      </div>
      {/* 如果是提示文本，就直接展示 */}
      {action === "HELP" ? renderContent : null}
    </>
  );
};

export default ResultItem;
