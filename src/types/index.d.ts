export type ActionType = "HELP" | "CODE";

declare global {
  interface CmdProps {
    cmd: string; // 输入整条命令
    base: string; // 基础命令
    params: Record<string, any>; // 参数
    action: ActionType;
    content: any;
    [extra: string]: any;
  }
}

// 最后一行的 export {} 是为了防止 TypeScript 将文件视为模块而不是全局类型声明。
export {};
