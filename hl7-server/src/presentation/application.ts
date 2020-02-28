//imports
import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';

export function Logo(): void {
    clear();
    console.log(
        chalk.blueBright(
            figlet.textSync('HL7 Server', { horizontalLayout: 'full' })
        )
    );
}