#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    .action((name, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { create } = yield import('./commands/create.js');
    create(name, options);
}));
program.on('--help', () => {
    // 打印logo
    console.log('\r\n' +
        figlet.textSync('ziMu-cli', {
            font: '3D-ASCII',
            width: 100,
        }));
    // 打印提示
    console.log(`\r\n Run ${chalk.cyan('zimu <command> --help')} for detailed usage of command \r\n `);
});
program.parse(process.argv);
