//imports
import figlet from 'figlet';
import chalk from 'chalk';
import boxen, { BorderStyle } from 'boxen';

export function Logo(): void {
    console.log(
        boxen(
            chalk.blueBright(
                figlet.textSync('Desk Services', { horizontalLayout: 'full' })
            ),
            { padding: 1, borderColor: 'magentaBright', borderStyle: BorderStyle.Double })
    );
}