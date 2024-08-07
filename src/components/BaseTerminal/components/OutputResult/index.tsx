'use client';

import { useCallback } from 'react';

interface OutputResultProps {
  key: string;
  content: Record<string, any>;
}

export default function OutputResult(props: OutputResultProps) {
  const { key, content } = props;

  /* 渲染器 */
  const renderer = useCallback((content: Record<string, any>) => {
    const type = content.type;
    if (type === 'list') {
      return (
        <ul>
          {content.data.map((item: any) => {
            return <li key={item.key}>{item.title}</li>;
          })}
        </ul>
      );
    }
    return <p>暂无此命令</p>;
  }, []);

  return (
    <div key={key}>
      &gt;{content.cmd}
      <div className='cmd-result'>{renderer(content)}</div>
    </div>
  );
}
