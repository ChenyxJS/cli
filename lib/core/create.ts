import { promisify } from "util";
import ora from "ora";
import inquirer from "inquirer";
import repoMap from "../config/repoMap";
import { modifyPackageJson } from "./modify";
// 使用Promise包裹，将download-git-repo改为异步操作
const download = promisify(require("download-git-repo"));

// 项目信息
const useInfo = () => {
  return inquirer.prompt([
    {
      type: "text",
      name: "author",
      message: "👨author",
      default: "author",
    },
    {
      type: "text",
      name: "version",
      message: "🆚version",
      default: "1.0.0",
    },
    {
      type: "text",
      name: "description",
      message: "📝description",
      default: "none",
    },
  ]);
};

// 选择框架
const useFrame = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "frame",
      message: "place choose frame",
      default: "tools-cli",
      choices: [
        { value: "tools-cli", name: "tools-cli" },
        { value: "vue3-ts", name: "vue3-ts" },
      ],
    },
  ]);
};

const getFrame = async () => {
  // 选择框架 这里后期也可以添加其他的构建选项 例如选择语言ts、js
  const frame = await useFrame();
  return `${frame.frame}`;
};

const getInfo = async () => {
  const info = await useInfo();
  return info;
};

export const createProjectAction = async (projectName: string) => {
  const frame = await getFrame();
  const info = await getInfo();
  const spinner = ora("Fetch...").start();
  await download(repoMap[frame], projectName, { clone: true })
    .then(() => {
      // 拉取完成后根据用户输入的info信息修改package.json
      modifyPackageJson(`./${projectName}`, { name: projectName, ...info });
      // 构建完成后打印运行提示信息
      spinner.succeed("success!");
      spinner.stop();
      console.log(`- cd ${projectName}`);
      console.log("- npm install     -- to install dependencies");
      console.log("- npm start       -- to run the project");
      console.log("- npm run build   -- to build the project");
    })
    .catch((error: any) => {
      // TODO 处理用户没有安装git的情况
      spinner.stop();
      console.log("\n");
      console.error(error);
      spinner.fail("初始化失败!");
    });
};
