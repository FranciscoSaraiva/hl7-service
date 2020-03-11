import { createDoente } from '../application/doentes';
import { createTipoExame } from '../application/tipo_exames';
import { Genero } from '../models/genero';

export async function SeedDatabase(): Promise<boolean> {
    //doentes
    await createDoente('111111111', 'Chico Chico', '911111111', Genero.MASCULINO);
    await createDoente('222222222', 'Cesár de Roma', '922222222', Genero.MASCULINO);
    await createDoente('333333333', 'Arturito', '933333333', Genero.MASCULINO);
    await createDoente('444444444', 'Bruninho Jardão', '944444444', Genero.MASCULINO);
    await createDoente('555555555', 'Chiquita', '955555555', Genero.FEMININO);
    await createDoente('666666666', 'Dani', '966666666', Genero.MASCULINO);

    //tipo exames
    await createTipoExame('RDLG', 'Radiologia');
    await createTipoExame('EXAM', 'Examinação');
    await createTipoExame('ENDO', 'Endoscopia');
    await createTipoExame('BIOP', 'Biopsia');

    return true;
}