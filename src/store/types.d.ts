export type ActionType = "HELP" | "RESULT"; // 命令分为两种，帮助提示、结果

export interface ResultProps {
  cmd: string; // 命令
  action: ActionType;
}
