/**
 * 命令设计：
 * 命令名：表示要执行的操作。例如：ls, cd。
 * 参数：紧随命令之后的输入，表示对命令的修饰或补充。例如：ls -l，cd /home/user。
 * 选项：带有前缀的修饰符，通常以 - 或 -- 开头，表示特定的行为。例如：--help, -r。
 *
 */
class ParseCommand {
  input: string;
  args: string[] = []; // 命令拆分
  command: string; // 基础命令
  params: string[] = []; // 命令后面的参数
  options: string[] = []; // 命令后的选项

  constructor(input: string) {
    this.input = input;
    this.args = input.trim().split(/\s+/);
    this.command = this.args[0];
  }

  parse(): CommandProps {
    for (let i = 1; i < this.args.length; i++) {
      const cur = this.args[i];
      if (cur.startsWith("-")) {
        this.options.push(cur);
      } else {
        this.params.push(cur);
      }
    }

    return {
      input: this.input,
      command: this.command,
      options: this.options,
      params: this.params,
    };
  }
}

export default ParseCommand;
