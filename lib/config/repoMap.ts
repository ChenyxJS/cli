// 代码仓库 控制台选择完后拉取这个仓库不同分支的代码
const getReportUrl = (name: string) => {
  return `direct:https://gitee.com/chen-yunx/chenyx-cli.git#${name}`;
};

const repoMap: Record<string, string> = {
  "tools-cli": getReportUrl("tools-cli"),
  "vue3-ts": getReportUrl("vue3-ts"),
};

export default repoMap;
