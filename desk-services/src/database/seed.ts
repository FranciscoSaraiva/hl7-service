import { createDoente } from '../application/doentes';
import { createTipoExame } from '../application/tipo_exames';

export async function SeedDatabase(): Promise<boolean> {
    //doentes
    await createDoente('111111111', 'Chico Chico', '911111111');
    await createDoente('222222222', 'Cesár de Roma', '922222222');
    await createDoente('333333333', 'Arturito', '933333333');
    await createDoente('444444444', 'Bruninho Jardão', '944444444');
    await createDoente('555555555', 'Chico do Vape', '955555555');
    await createDoente('666666666', 'Dani', '966666666');

    //tipo exames
    await createTipoExame('RDLG', 'Radiologia');
    await createTipoExame('EXAM', 'Examinação');
    await createTipoExame('ENDO', 'Endoscopia');
    await createTipoExame('BIOP', 'Biopsia');

    return true;
}