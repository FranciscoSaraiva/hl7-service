import { AtoMedico } from '../models/ato_medico';
import { Doente } from '../models/doente';

export async function SeedDatabase(): Promise<boolean> {
    let consulta_geral = new AtoMedico('Consulta Geral');
    await consulta_geral.save();
    let consulta_exames = new AtoMedico('Exames');
    await consulta_exames.save();
    let consulta_tratamento = new AtoMedico('Tratamento');
    await consulta_tratamento.save();
    let consulta_receitas = new AtoMedico('Receitas');
    await consulta_receitas.save();

    let doente_francisco = new Doente(111222333, 'Lisboa', 911111111);
    await doente_francisco.save();
    let doente_cesar = new Doente(111222334, 'Braga', 922222222);
    await doente_cesar.save();

    return true;
}