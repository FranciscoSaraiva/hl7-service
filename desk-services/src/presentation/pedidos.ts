//imports
import { getRepository } from 'typeorm';
import chalk from 'chalk';
import clear from 'clear';
import inquirer from 'inquirer';
//local
import { Pedido } from '../models/pedido';
import { CreateTable } from './tables';
import { MainMenuView } from './main_menu';
import { Doente } from '../models/doente';
import { Worklist } from '../models/worklist';
import { TipoExame } from '../models/tipo_exame';
import { getDoente, getDoentes } from '../application/doentes';
import { getTipoExame, getTipoExames } from '../application/tipo_exames';
import { createExame } from '../application/exames';
import { Exame } from '../models/exame';
import { createWorklist } from '../application/worklists';


export async function CriarPedidoView(): Promise<void> {
    clear();
    var doentes: Doente[] = await getDoentes();
    let doentesList: string[] = [];
    doentes.forEach((doente: Doente) => {
        let num_utente: string = doente.getNum_utente();
        let nome: string = doente.getNome();
        doentesList.push(`${num_utente}-${nome}`);
    });

    var tipos_exames = await getTipoExames();
    let tipos_examesList: string[] = [];
    tipos_exames.forEach((tipo: TipoExame) => {
        tipos_examesList.push(tipo.getDescricao());
    });

    inquirer.prompt([
        { type: 'list', name: 'doente', message: 'Qual o doente?', choices: doentesList },
        { type: 'list', name: 'tipo_exame', message: 'Qual o tipo de exame?', choices: tipos_examesList },
        { type: 'input', name: 'descricao', message: 'Descreva o exame: ', choices: tipos_examesList }
    ])
        .then(async answer => {
            let doente_answer: string = answer.doente.split('-')[0];
            let tipo_exame_answer: string = answer.tipo_exame;
            let descricao_answer: string = answer.descricao;

            var doente: Doente = await getDoente(doente_answer);
            var tipo_exame: TipoExame = await getTipoExame(tipo_exame_answer);
            var exame: Exame = await createExame(descricao_answer, tipo_exame)
            var pedido = new Pedido(exame, doente);
            await pedido.save();

            await createWorklist(pedido);

            clear();
            MainMenuView();
        })
        .catch(err => { console.log(err) })
}

export function VerPedidosView(): void {
    clear();
    getRepository(Pedido).find()
        .then(async (pedidos: Pedido[]) => {

            if (pedidos.length == 0) {
                console.log(chalk.redBright('Não existem pedidos...'));
                MainMenuView();
                return;
            }

            var pedidosRow: any[] = [];

            for (let index = 0; index < pedidos.length; index++) {
                var pedido: Pedido = pedidos[index];

                let doente: Doente = await getDoente(pedido.getDoente().getNum_utente());
                let doente_nome: string = doente.getNome();

                let tipo_exame: TipoExame = await getTipoExame(pedido.getExame().getTipo_exame().getDescricao());
                let tipo_exame_ato: string = tipo_exame.getDescricao();

                let num_pedido: number = pedido.getId();
                let data_hora: Date = pedido.getData_hora();
                let data_hora_formatted: string = `${data_hora.getDate()}-${data_hora.getMonth() + 1}-${data_hora.getFullYear()} ${data_hora.getHours()}:${data_hora.getMinutes()}`;

                let estado = (pedido.isEstado()) ? 'Realizado' : 'Não Realizado';

                pedidosRow.push([num_pedido, data_hora_formatted, doente_nome, tipo_exame_ato, estado]);
            }

            var table = CreateTable(
                ['Nº Pedido', 'Data e Hora', 'Doente', 'Ato Médico', 'Estado'],
                pedidosRow);
            console.log(table.toString());
            MainMenuView();
        })
        .catch(err => {
            console.log(chalk.redBright(err));
        });
}