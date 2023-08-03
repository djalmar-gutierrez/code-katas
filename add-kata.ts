import inquirer from 'inquirer';
import fs from 'fs';
// @ts-ignore
import copy from 'copy-template-dir';
import path, { format } from 'path';

const formatTitle = (title: string): string => title.replace(/ /g, '-').toLowerCase();

const askRank = async (): Promise<string> => {
    const { rank } = await inquirer.prompt<{ rank: string }>([
        {
            name: 'rank',
            type: 'list',
            message: 'What is the rank of this kata? (Enter to select)',
            choices: ['8kyu', '7kyu', '6kyu', '5kyu', '4kyu', '3kyu', '2kyu', '1kyu'],
            loop: false
        }
    ]);

    return rank;
};

const askTitle = async (rank: string): Promise<string> => {
    const { title } = await inquirer.prompt<{ title: string }>([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of this kata? (required)',
            validate: (input: string) => {
                if (!input) {
                    return 'Please enter a title for this kata';
                }

                if (fs.existsSync(path.join(process.cwd(), `rank/${rank}/${formatTitle(input)}`))) {
                    return 'A kata with this title already exists';
                }

                return true;
            }
        }
    ]);

    return title;
};

inquirer
    .prompt([
        {
            name: 'add',
            type: 'confirm',
            message: 'Would you like to add a new kata?'
        }
    ])
    .then(async ({ add }: { add: boolean }): Promise<void> => {
        if (add) {
            const rank = await askRank();
            const title = await askTitle(rank);

            const vars = { rank, title };
            const inDir = path.join(process.cwd(), 'template');
            const outDir = path.join(process.cwd(), `rank/${rank}/${formatTitle(title)}`);

            copy(inDir, outDir, vars, (err: any, createdFiles: string[]): void => {
                if (err) throw err;
                createdFiles.forEach((filePath) => console.log(`Created ${filePath}`));
                console.log('done!');
            });
        }
    });
