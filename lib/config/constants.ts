import { version } from "../../package.json";

export type action = {
  alias: string;
  description: string;
  examples: string[];
};

const actions: Record<string, action> = {
  create: {
    alias: "c",
    description: "create a project",
    examples: ["chenyx-cli create <project-name>"],
  },
  "*": {
    alias: "",
    description: "command not found",
    examples: [],
  },
};

export { version, actions };
