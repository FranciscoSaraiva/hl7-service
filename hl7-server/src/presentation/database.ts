//imports
import clear from 'clear';
import chalk from 'chalk';

export function ConnectingDatabase(): void {
    clear();
    chalk.redBright(console.log('Connecting to database...'));
}

export function ConnectedDatabase(): void {
    clear();
    chalk.greenBright(console.log('Connected...!'));
}