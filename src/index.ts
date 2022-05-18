import { Command, flags } from '@oclif/command';
import * as execa from 'execa';
import * as ncp from 'ncp';
import * as path from 'path';

const exec = async (command: string, options: any): Promise<void> => {
  try {
    await execa.command(command, options);
  } catch (error) {
    throw error;
  }
};

class TsNew extends Command {
  static description = '';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [];

  async run() {
    try {
      const workingDirectory = path.join(process.cwd());
      const libFolderPath = path.resolve(__dirname, '../sources');

      await this.copyProjectFiles(libFolderPath, workingDirectory);
      await this.installDependencies(workingDirectory);
      this.log('Project ready, happy hacking!');
      this.log('start with: npm run watch');
    } catch (error) {
      this.log('Something went wrong', error);
    }
  }

  async copyProjectFiles(source: string, destination: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ncp(source, destination, function (error) {
        if (error) reject(error);
        resolve();
      });
    });
  }

  async installDependencies(destination: string) {
    const options = { cwd: destination, stdio: ['ignore', 'inherit', 'inherit'] };

    this.log('Installing dependencies');
    await exec('npm install', options);
  }
}

export = TsNew;
