#! /usr/bin/env node
import { program } from 'commander';
import packageData from '../package.json' assert { type: 'json' };
import chalk from 'chalk';
import figlet from 'figlet';

program
  .version(`${packageData.version}`)
  .command('create <project-name>')
  .description('create one new program')
  .option('-f --force', '如果项目目录已经存在，直接覆盖它')
  .option('-v --vue3', '创建一个vue3的项目')
  .option('-r --react18', '创建一个react18的项目')
  .action(async (name: string, options) => {
    const { create } = await import('./commands/create.js');
    create(name, options);
  });

program.on('--help', () => {
  // 打印logo
  console.log(
    '\r\n' +
      figlet.textSync('ziMu-cli', {
        font: '3D-ASCII',
        width: 100,
      }),
  );
  // 打印提示
  console.log(
    `\r\n Run ${chalk.cyan('zimu <command> --help')} for detailed usage of command \r\n `,
  );
});

program.parse(process.argv);
