import gitClone from 'git-clone/promise.js';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function downloadTemplate(teamlateGitUrl: string, downloadPath: string) {
  const spinner = ora(chalk.yellowBright('创建项目中... 请耐心等待🔥🔥🔥')).start();
  try {
    await gitClone(teamlateGitUrl, downloadPath, { checkout: 'main', shallow: true });
    fs.removeSync(path.join(downloadPath, '.git'));
    spinner.succeed(chalk.greenBright('恭喜你 项目创建成功啦~~~😁😁😁'));
  } catch (error) {
    spinner.fail(chalk.redBright(`很不幸呢 项目创建失败了哎😭`));
    console.log(chalk.redBright(`报错信息如下：`));
    console.log(chalk.bgRedBright(`${error}`));
  }
}
