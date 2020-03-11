//imports
import clear from 'clear';
import { getRepository } from 'typeorm';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { Pedido } from '../models/pedido';
import { MainMenuView } from './main_menu';
import { getPedido } from '../application/pedidos';
import { createWorklist } from '../application/worklists';

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
                let pedido_id: number = pedido.getId();
                let doente_utente: string = pedido.getDoente().getNum_utente();
                let doente_nome: string = pedido.getDoente().getNome();
                let tipo_exame: string = pedido.getExame().getTipo_exame();
                let exame_desc: string = pedido.getExame().getDescricao();
                pedidosList.push(`${pedido_id}-[${doente_utente}-${doente_nome}] | ${tipo_exame} [${exame_desc}]`);
            }

            inquirer.prompt([
                { type: 'list', name: 'pedido', message: 'Qual o exame a realizar?', choices: pedidosList },
            ]).then(async answer => {
                let pedido_id = answer.pedido.split('-')[0];
                var pedido: Pedido = await getPedido(pedido_id);
                pedido.setEstado(true);
                await pedido.save();
                await createWorklist(pedido);
                
                clear();
                let doente_utente: string = pedido.getDoente().getNum_utente();
                let doente_nome: string = pedido.getDoente().getNome();
                console.log(chalk.greenBright(`Exame realizado ao doente [${doente_utente}-${doente_nome}]\n`));
                MainMenuView();
            })
        })
        .catch(err => {
            console.log(chalk.redBright(err));
        });
}