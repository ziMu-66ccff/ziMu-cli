var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import gitClone from 'git-clone/promise.js';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
export function downloadTemplate(teamlateGitUrl, downloadPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = ora(chalk.yellowBright('创建项目中... 请耐心等待🔥🔥🔥')).start();
        try {
            yield gitClone(teamlateGitUrl, downloadPath, { checkout: 'main', shallow: true });
            fs.removeSync(path.join(downloadPath, '.git'));
            spinner.succeed(chalk.greenBright('恭喜你 项目创建成功啦~~~😁😁😁'));
        }
        catch (error) {
            spinner.fail(chalk.redBright(`很不幸呢 项目创建失败了哎😭`));
            console.log(chalk.redBright(`报错信息如下：`));
            console.log(chalk.bgRedBright(`${error}`));
        }
    });
}
