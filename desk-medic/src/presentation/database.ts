//imports
import clear from 'clear';
import chalk from 'chalk';

export function ConnectingDatabaseView(): void {
    clear();
    chalk.redBright(console.log('Connecting to database...'));
}

export function ConnectedDatabaseView(): void {
    clear();
    chalk.greenBright(console.log('Connected...!'));
}

export function SeedingDatabaseView(): void {
    clear();
    chalk.redBright(console.log('Seeding database...'))
}