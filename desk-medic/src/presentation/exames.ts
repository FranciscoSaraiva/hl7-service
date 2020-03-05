//imports
import clear from 'clear';
import { getRepository } from 'typeorm';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { Pedido } from '../models/pedido';
import { MainMenuView } from './main_menu';
import { Worklist } from '../models/worklist';

export function RealizarExameView(): void {
    clear();
    getRepository(Pedido).find()
        .then(async (pedidos: Pedido[]) => {

            var pedidosList: string[] = [];

            if (pedidos.length == 0) {
                console.log(chalk.redBright('Não existem pedidos...'));
                MainMenuView();
                return;
            }

            for (let index = 0; index < pedidos.length; index++) {
                var pedido = pedidos[index];
                pedidosList.push(pedido.GetNumero_Pedido().toString());
            }

            inquirer.prompt([
                { type: 'list', name: 'pedido', message: 'Qual o pedido a realizar exame?', choices: pedidosList },
            ]).then(async answer => {
                let pedido_id = answer.pedido;
                var pedido: Pedido = await getRepository(Pedido).findOne({ where: { numero_pedido: pedido_id } });
                pedido.SetEstado(true);
                await pedido.save();

                var worklist = new Worklist(pedido.GetNumero_Pedido(), pedido.GetConsulta().GetIdentificador());
                worklist.SetEstado_pedido(true);
                await worklist.save();

                clear();
                console.log(chalk.greenBright(`Exame realizado ao pedido ${pedido.GetNumero_Pedido()}\n`));
                MainMenuView();
            })
        })
        .catch(err => {
            console.log(chalk.redBright(err));
        });
}