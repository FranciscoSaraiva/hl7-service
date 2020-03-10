//imports
import { getRepository } from 'typeorm';
import inquirer from 'inquirer';
import clear from 'clear';
import chalk from 'chalk';
//local
import { MainMenuView } from './main_menu';
import { getPedidos, getPedido } from '../application/pedidos';
import { Pedido } from '../models/pedido';


export async function VerRelatorios(): Promise<void> {

    var pedidos: Pedido[] = await getPedidos();
    var pedidos_list: string[] = [];


    for (let index = 0; index < pedidos.length; index++) {
        let pedido: Pedido = pedidos[index];

        let pedido_id: number = pedido.getId();
        let doente_nome: string = pedido.getDoente().getNome();
        let doente_num: string = pedido.getDoente().getNum_utente();
        let tipo_exame: string = pedido.getExame().getTipo_exame().getDescricao();
        let exame: string = pedido.getExame().getDescricao();

        pedidos_list.push(`${pedido_id}-${doente_nome}-${doente_num} | ${tipo_exame} - ${exame}`);
    }

    inquirer.prompt([
        { type: 'list', name: 'consulta', message: 'Qual a consulta?', choices: pedidos_list },
    ])
        .then(async answer => {
            clear();

            let pedido_id: number = answer.consulta.split('-')[0];

            var pedido: Pedido = await getPedido(pedido_id);

            let relatorio: string = (pedido.getExame().getRelatorio().length > 0) ? pedido.getExame().getRelatorio() : '(N/A)';
            let doente_nome: string = pedido.getDoente().getNome();
            let doente_num: string = pedido.getDoente().getNum_utente();

            console.log(chalk.redBright(`Doente : ${doente_num}-${doente_nome}`));
            console.log(chalk.redBright('Relatório: ') + relatorio);
            console.log('\n');
            MainMenuView();
        })
        .catch(err => { console.log(err) })
}