// 解析命令
class ParseUtil {
  cmd: string; // 输入的命令
  base: string; // 基础命令
  options: Record<string, any>; // 命令参数

  constructor() {
    this.cmd = "";
  }

  static parse(value: string): Omit<CmdProps, "key"> {
    return {
      cmd: value,
      base: "help",
      params: {},
      action: "HELP",
    };
  }
}

export default ParseUtil;
