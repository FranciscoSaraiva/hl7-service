//imports
import clear from 'clear';
import { getRepository } from 'typeorm';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { Pedido } from '../models/pedido';
import { MainMenuView } from './main_menu';
import { Consulta } from '../models/consulta';
import { Worklist } from '../models/worklist';

export function EmitirRelatorioView(): void {
    clear();
    getRepository(Pedido).find({ where: { estado: true } })
        .then(async (pedidos: Pedido[]) => {

            if (pedidos.length == 0) {
                console.log(chalk.redBright('Não existem pedidos concluídos, então não pode emitir relatórios.'))
                MainMenuView();
                return;
            }

            var pedidos_list: string[] = [];

            for (let index = 0; index < pedidos.length; index++) {
                var pedido = pedidos[index];
                pedidos_list.push(pedido.GetNumero_Pedido().toString());
            }

            inquirer.prompt([
                { type: "list", name: "pedido", message: "Qual o pedido a emitir relatório?", choices: pedidos_list },
                { type: "input", name: "relatorio", message: "Introduza o relatório: " }
            ])
                .then(answer => {
                    getRepository(Pedido).findOne({ where: { numero_pedido: answer.pedido } })
                        .then(async (pedido: Pedido) => {
                            var consulta: Consulta = pedido.GetConsulta();
                            var relatorio = answer.relatorio;

                            consulta.SetRelatorio(relatorio);
                            await consulta.save();

                            var worklist = new Worklist(pedido.GetNumero_Pedido(), pedido.GetConsulta().GetIdentificador());
                            worklist.SetEstado_pedido(true);
                            worklist.SetRelatorio(relatorio);
                            await worklist.save();

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