//imports
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { VerPedidosView, CriarPedidoView } from './pedidos';

const registar_pedido = chalk.blueBright('Registar Pedidos');
const ver_pedidos = chalk.blueBright('Ver Pedidos');
const ver_relatorios = chalk.blueBright('Ver Relatórios');
//
const sair = chalk.red('Sair');

export function MainMenuView(): void {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Escolha uma opção",
        choices: [registar_pedido, ver_pedidos, ver_relatorios, new inquirer.Separator(), sair]
    })
        .then(answers => {
            switch (answers.option) {
                case registar_pedido:
                    CriarPedidoView();
                    break;
                case ver_pedidos:
                    VerPedidosView();
                    break;
                case ver_relatorios:
                    console.log('ver relatorios')
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