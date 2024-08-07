'use client';
import { useState } from 'react';
import CmdInput from './components/CmdInput';
import type { ResultProps } from './types';
import OutputResult from './components/OutputResult';

export default function BaseTerminal() {
  const [resultList, setResultList] = useState<ResultProps[]>([]);

  const handleEnter = (cmd: string, content: Record<string, any>) => {
    if (cmd.toLocaleLowerCase() === 'clear') {
      setResultList([]);
    } else {
      setResultList([...resultList, { key: +new Date() + '', cmd, content }]);
    }
  };

  return (
    <div className='container flex flex-col'>
      {resultList.map(({ key, content }) => {
        return <OutputResult key={key} content={content} />;
      })}

      <div className='input-container'>
        <div>请在下面输入命令</div>
        <CmdInput onEnter={handleEnter} />
      </div>
    </div>
  );
}
