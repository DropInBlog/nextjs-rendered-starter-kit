#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

declare const __dirname: string;

const program = new Command();

program
  .name('nextjs-rendered-starter-kit')
  .description(
    'Add /blog and /dib-lib to a Next.js project, with DropInBlog dependencies'
  )
  .version('1.1.0')
  .option('--no-src', 'Project does not use src folder')
  .action(async (options) => {
    console.log(chalk.cyan('🚀 Setting up Next.js rendered starter kit...\n'));

    // Determine if project uses src/
    const usesSrc = options.src
      ? (
          await inquirer.prompt([
            {
              type: 'confirm',
              name: 'usesSrc',
              message: 'Is your Next.js project using the "src/" folder?',
              default: true,
            },
          ])
        ).usesSrc
      : options.src;

    const projectRoot = process.cwd();
    const basePath = usesSrc ? path.join(projectRoot, 'src') : projectRoot;

    const targetBlogDir = path.join(basePath, 'app/blog');
    const targetLibDir = path.join(basePath, 'dib-lib');

    const blogDir = path.join(__dirname, '../template/blog');
    const libDir = path.join(__dirname, '../template/dib-lib');

    // Avoid overwriting
    for (const [label, target] of Object.entries({
      '/blog': targetBlogDir,
      '/dib-lib': targetLibDir,
    })) {
      if (fs.existsSync(target)) {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `${label} already exists. Overwrite?`,
            default: false,
          },
        ]);
        if (!overwrite) {
          console.log(chalk.yellow(`⚠️  Skipped ${label}`));
          continue;
        }
        fs.rmSync(target, { recursive: true, force: true });
      }

      fs.mkdirSync(target, { recursive: true });
      const source = label === '/blog' ? blogDir : libDir;
      fs.cpSync(source, target, { recursive: true });
      console.log(chalk.green(`✅ Added ${label} module.`));
    }

    // Ask to install dependencies
    const { shouldInstall } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldInstall',
        message: 'Do you want to install DropInBlog dependencies now?',
        default: true,
      },
    ]);

    if (shouldInstall) {
      console.log(chalk.cyan('\n📦 Installing required packages...'));

      const hasYarn = fs.existsSync(path.join(projectRoot, 'yarn.lock'));
      const hasPnpm = fs.existsSync(path.join(projectRoot, 'pnpm-lock.yaml'));
      const packageManager = hasYarn
        ? 'yarn add'
        : hasPnpm
        ? 'pnpm add'
        : 'npm install';

      try {
        execSync(
          `${packageManager} @dropinblog/nextjs-rendered @dropinblog/api-client`,
          { stdio: 'inherit' }
        );
        console.log(chalk.green('\n✅ Packages installed successfully!'));
      } catch {
        console.error(
          chalk.red('\n❌ Failed to install packages automatically.')
        );
        console.log(chalk.yellow('\nPlease run manually:'));
        console.log(
          chalk.cyan(
            'npm install @dropinblog/nextjs-rendered @dropinblog/api-client'
          )
        );
      }
    }

    console.log(chalk.green('\n🎉 Setup completed successfully!'));
  });

program.parse();
