#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();
program
  .name('create-blog-module')
  .description('Add /blog route to an existing Next.js project')
  .action(() => {
    const projectRoot = process.cwd();
    const targetBlogDir = path.join(projectRoot, 'src/app/blog');
    const targetLibDir = path.join(projectRoot, 'src/dib-lib');
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

    console.log(chalk.green('✅ Blog module added to src/app/blog'));
    console.log(chalk.green('✅ Lib module added to src/dib-lib'));
  });

program.parse();
