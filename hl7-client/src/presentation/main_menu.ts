//imports
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local


const ver_estado_pedidos = chalk.blueBright('Ver estado de pedidos');
const realizar_exame = chalk.blueBright('Realizar exame');
const emitir_relatorio = chalk.blueBright('Emitir relatório');
//
const sair = chalk.red('Sair');

export function MainMenuView(): void {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Escolha uma opção",
        choices: [ver_estado_pedidos, realizar_exame, emitir_relatorio, new inquirer.Separator(), sair]
    })
        .then(answers => {
            switch (answers.option) {
                case ver_estado_pedidos:
                    break;
                case realizar_exame:
                    break;
                case emitir_relatorio:
                    break;
                case sair:
                    process.exit(0);
                default:
                    clear();
                    MainMenuView();
                    break;
            }
        })
}