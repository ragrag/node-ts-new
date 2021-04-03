import { Command } from '@oclif/command';
declare class TsNew extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
    };
    static args: never[];
    run(): Promise<void>;
    copyProjectFiles(source: string, destination: string): Promise<void>;
    installDependencies(destination: string): Promise<void>;
}
export = TsNew;
