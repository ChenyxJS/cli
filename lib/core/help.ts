import { program } from "commander";
import { actions } from "../config/constants";

const helpOptions = () => {
  // 监听--help
  program.on("--help", () => {
    console.log("\nExamples:");
    // 循环遍历actions的键,获取对应的example进行log
    Reflect.ownKeys(actions).forEach((key: any) => {
      actions[key].examples.forEach((example: string) => {
        console.log(example);
      });
    });
  });
};

export default helpOptions;
