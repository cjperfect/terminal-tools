import { useMemo } from "react";
import Prefix from "../Prefix";
import CodeHighlight from "../CodeHighlight";
import { CMDHELP, SPLIT_CHAR } from "@/constants";
import dayjs from "dayjs";

const ResultItem: React.FC<CmdProps> = (props) => {
  const { cmd, action, content } = props;

  const renderContent = useMemo(() => {
    if (action === "HELP") {
      if (cmd === "help") {
        return CMDHELP.map((inst, index) => {
          const [text, tipText] = inst.split(SPLIT_CHAR);
          return (
            <div
              key={index}
              className="flex items-center px-2 text-emerald-300"
            >
              <span className="w-[50%]">{text}</span>
              <span>{tipText}</span>
            </div>
          );
        });
      } else {
        if (!content)
          return (
            <span className="px-2 text-amber-300">
              暂无此命令，请输如help查看已有命令
            </span>
          );
        return (
          <div className="px-2">
            <span className="text-purple-400">
              时间：{dayjs().format("YYYY-MM-DD HH:mm:ss")}
            </span>
            <CodeHighlight
              code={content}
              language={"js"}
              plugins={["line-numbers"]}
            />
          </div>
        );
      }
    }

    return null;
  }, [action, cmd, content]);

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
