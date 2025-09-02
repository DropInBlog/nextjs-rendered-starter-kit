#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';

// emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('nextjs-rendered-starter-kit')
  .description('Add /blog and /dib-lib to a Next.js project')
  .version('1.0.0')
  .action(async () => {
    // Ask user if project uses src/
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usesSrc',
        message: 'Is your Next.js project using the "src/" folder?',
        default: true,
      },
    ]);

    const projectRoot = process.cwd();
    const basePath = answers.usesSrc
      ? path.join(projectRoot, 'src')
      : projectRoot;

    const targetBlogDir = path.join(basePath, 'app/blog');
    const targetLibDir = path.join(basePath, 'dib-lib');

    const blogDir = path.join(__dirname, '../template/blog');
    const libDir = path.join(__dirname, '../template/dib-lib');

    if (fs.existsSync(targetBlogDir)) {
      console.log(
        chalk.yellow(
          '⚠️  /blog folder already exists. Aborting to prevent overwrite.'
        )
      );
      process.exit(1);
    }

    if (fs.existsSync(targetLibDir)) {
      console.log(
        chalk.yellow(
          '⚠️  /dib-lib folder already exists. Aborting to prevent overwrite.'
        )
      );
      process.exit(1);
    }

    fs.mkdirSync(targetBlogDir, { recursive: true });
    fs.cpSync(blogDir, targetBlogDir, { recursive: true });

    fs.mkdirSync(targetLibDir, { recursive: true });
    fs.cpSync(libDir, targetLibDir, { recursive: true });

    console.log(
      chalk.green(
        `✅ Blog module added to ${path.relative(projectRoot, targetBlogDir)}`
      )
    );
    console.log(
      chalk.green(
        `✅ Lib module added to ${path.relative(projectRoot, targetLibDir)}`
      )
    );
  });

program.parse();
