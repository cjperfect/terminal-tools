'use client';

/* 测试数据 */
const listMap = ['help', 'posts'];

/* 测试数据 */
const contentMap: Record<string, any> = {
  help: [{ key: '1', title: 'posts\t\t显示所有文章' }],
  posts: [
    { key: '1', title: '文章1' },
    { key: '2', title: '文章2' },
  ],
};

export default function CmdInput(props: any) {
  const { onEnter } = props;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const val = target.value.trim();
      onEnter(val, getContentStruct(val));
      target.value = '';
    }
  };

  const getContentStruct = (cmd: string) => {
    const type = listMap.includes(cmd) ? 'list' : 'other';
    const data = contentMap[cmd] || [];
    return {
      type,
      cmd,
      data,
    };
  };

  return (
    <div>
      &gt;
      <input onKeyDown={handleKeyDown} />
    </div>
  );
}
