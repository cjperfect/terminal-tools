import { useRef, useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.min.css";
import { Icon } from "@iconify/react";
import copy from "copy-to-clipboard";

function PrismCode({ code, language, plugins = [] }) {
  const ref = useRef(null);

  const [isCopyFin, setIsCopyFin] = useState<boolean>(false);

  useEffect(() => {
    if (ref && ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code]);

  const handleCopy = () => {
    if (code) {
      copy(code);
      setIsCopyFin(true);

      const timer = setTimeout(() => {
        setIsCopyFin(false);
        clearTimeout(timer);
      }, 2000);
    }
  };

  return (
    <div className="w-full relative">
      {isCopyFin ? (
        <span className="absolute right-1 top-1 text-xs text-green-500">
          复制成功
        </span>
      ) : (
        <Icon
          icon="ant-design:copy-filled"
          width="18"
          height="18"
          className="absolute right-1 top-1"
          onClick={handleCopy}
        />
      )}
      <pre className={`${plugins.join(" ")}`}>
        <code ref={ref} className={`prism-code language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export default PrismCode;
