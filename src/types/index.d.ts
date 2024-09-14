declare global {
  interface CommandProps {
    input: string; // 整条命令
    command: string; // 基础命令 cd
    params: string[]; // 命令参数 cd  /home/usr   /home/usr就是参数
    options: string[]; // 命令选项 --help -h
  }
}

// 最后一行的 export {} 是为了防止 TypeScript 将文件视为模块而不是全局类型声明。
export {};
