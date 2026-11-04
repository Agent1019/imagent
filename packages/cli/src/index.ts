#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("imagent")
  .description("CLI for the imagent package registry")
  .version("0.1.0");

program
  .command("search")
  .description("Search for packages")
  .argument("<query>", "Search query")
  .action((query: string) => {
    console.log(chalk.cyan(`Searching for: ${query}`));
    console.log(chalk.gray("(Not yet implemented)"));
  });

program
  .command("install")
  .description("Install a package")
  .argument("<name>", "Package name")
  .action((name: string) => {
    console.log(chalk.cyan(`Installing: ${name}`));
    console.log(chalk.gray("(Not yet implemented)"));
  });

program
  .command("publish")
  .description("Publish a package to the registry")
  .action(() => {
    console.log(chalk.cyan("Publishing package..."));
    console.log(chalk.gray("(Not yet implemented)"));
  });

program.parse();
