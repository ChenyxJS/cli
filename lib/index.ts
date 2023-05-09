#!/usr/bin/env node

import { program } from "commander";
import { version } from "./config/constants";
import helpOptions from "./core/help";
import commands from "./core/commands";

program
  .name("chenyx-cli")
  .description("TypeScript application generator for chenyx-cli")
  .version(version, "-v,--version");
// 帮助提示
helpOptions();
// 命令注册
commands();

program.parse(process.argv);
