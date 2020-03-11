//imports
import clear from 'clear';
import { getRepository } from 'typeorm';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { Pedido } from '../models/pedido';
import { MainMenuView } from './main_menu';
import { Worklist } from '../models/worklist';
import { createWorklist } from '../application/worklists';

export function EmitirRelatorioView(): void {
    clear();
    getRepository(Pedido).find({ where: { estado: true } })
        .then(async (pedidos: Pedido[]) => {

            if (pedidos.length == 0) {
                console.log(chalk.redBright('Não existem exame realizados, então não pode emitir relatórios.'))
                MainMenuView();
                return;
            }

            var pedidos_list: string[] = [];

            for (let index = 0; index < pedidos.length; index++) {
                var pedido = pedidos[index];

                let pedido_id: number = pedido.getId();
                let tipo_exame: string = pedido.getExame().getTipo_exame();
                let doente_utente: string = pedido.getDoente().getNum_utente();
                let doente_nome: string = pedido.getDoente().getNome();

                pedidos_list.push(`${pedido_id}-[${tipo_exame}] ${doente_utente}-${doente_nome}`);
            }

            inquirer.prompt([
                { type: "list", name: "pedido", message: "Qual o exame a emitir relatório?", choices: pedidos_list },
                { type: "input", name: "relatorio", message: "Introduza o relatório: " }
            ])
                .then(answer => {
                    let pedido_id: number = answer.pedido.split('-')[0];
                    getRepository(Pedido).findOne({ where: { id: pedido_id } })
                        .then(async (pedido: Pedido) => {
                            var relatorio = answer.relatorio;

                            pedido.getExame().setRelatorio(relatorio);
                            await pedido.getExame().save();
                            await createWorklist(pedido);

                            clear();
                            console.log(chalk.greenBright('O relatório foi submetido.\n'));
                            MainMenuView();
                        })
                        .catch(err => { console.log(err); process.exit(0); })
                })
                .catch(err => { console.log(err); process.exit(0); })
        })
        .catch((err) => {
            console.log(err);
        })
}