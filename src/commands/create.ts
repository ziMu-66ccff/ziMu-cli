import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { confirm, select } from '@inquirer/prompts';
import { downloadTemplate } from '../utils/download.js';
import { REACT_TEMPLATE_URL, VUE3_TEAMLATE_URL } from '../utils/const.js';
import type { Template, TemplateUrl } from './type.js';

export async function create(name: any, options: any) {
  const cwd = process.cwd();
  const targetPath = path.join(cwd, name);
  let targetTemplate: Template;
  let targetTemplateUrl: TemplateUrl;

  if (options.vue3) {
    targetTemplate = options.vue3;
  } else if (options.react18) {
    targetTemplate = options.react18;
  } else {
    targetTemplate = await select({
      message: '你想要使用的框架是什么呢🤔',
      choices: [
        {
          name: 'vue3',
          value: 'vue3',
          description: '一款易上手的响应式框架, 该版本支持组合式API',
        },
        {
          name: 'react18',
          value: 'react18',
          description: '一款灵活度极高的响应式库, 该版本支持hooks',
        },
      ],
    });
  }
  switch (targetTemplate) {
    case 'vue3':
      targetTemplateUrl = VUE3_TEAMLATE_URL;
      break;
    case 'react18':
      targetTemplateUrl = REACT_TEMPLATE_URL;
    default:
      targetTemplateUrl = VUE3_TEAMLATE_URL;
      break;
  }

  if (fs.existsSync(targetPath)) {
    if (options.force) {
      const spinner = ora(chalk.yellowBright('覆盖中..., 请耐心等待奥🔥')).start();
      await fs.remove(targetPath).catch((err) => {
        spinner.fail(chalk.bgRed('覆盖失败'));
        throw new Error(`报错信息：${err}`);
      });
      spinner.succeed(chalk.greenBright('覆盖成功！😁'));
      await downloadTemplate(VUE3_TEAMLATE_URL, targetPath);
      return;
    }
    const isOverwrite = await confirm({
      message: chalk.green('该项目目录已经存在了奥 需要覆盖它吗?🤔'),
      default: true,
    });
    if (isOverwrite) {
      const spinner = ora(chalk.yellowBright('覆盖中..., 请耐心等待奥🔥')).start();
      await fs.remove(targetPath).catch((err) => {
        spinner.fail(chalk.bgRed('覆盖失败'));
        throw new Error(`报错信息：${err}`);
      });
      spinner.succeed(chalk.greenBright('覆盖成功！😁'));
      await downloadTemplate(targetTemplateUrl, targetPath);
      return;
    }
    return;
  }
  await downloadTemplate(targetTemplateUrl, targetPath);
}
