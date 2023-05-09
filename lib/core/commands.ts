import { actions } from "../config/constants";
import { program } from "commander";
import { createProjectAction } from "./create";

const commands = () => {
  // Reflect.ownKeys获取actions属性数组
  Reflect.ownKeys(actions).forEach((action: any) => {
    program
      .command(action) // 配置命令名称
      .alias(actions[action].alias) // 配置命令别名
      .description(actions[action].description) // 配置命令描述
      .action(() => {
        if (action === "*") {
          console.log(actions[action].description);
        } else {
          const projectName = process.argv.slice(3).toString();
          createProjectAction(projectName);
        }
      });
  });
};
export default commands;
