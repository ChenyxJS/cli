import fs from "fs-extra"
import path from "path"
import handlebars from "handlebars"
import ora from "ora"

const log = ora("modify")

export const modifyPackageJson = function (downloadPath: string, options: any) {
  const packagePath = path.join(downloadPath, "package.json")
  log.start("start modifying package.json")
  // 判断是否存在package.json
  if (fs.existsSync(packagePath)) {
    // 读取内容
    const content = fs.readFileSync(packagePath).toString()
    // handlebars根据远程配置好的插槽匹配对应的信息进行修改
    const template = handlebars.compile(content)
    const result = template(options)
    // 将修改完的内容重新写入
    fs.writeFileSync(packagePath, result)
    log.stop()
    log.succeed("modify package.json complate")
  } else {
    log.stop()
    log.fail("modify package.json fail")
    throw new Error("no package.json")
  }
}
