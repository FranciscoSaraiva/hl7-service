var hl7 = require('simple-hl7');
var typeorm = require('typeorm');
var app = hl7.tcp();

typeorm.createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "desk-medic",
    "entities": [
        "./build/models/*.js",
    ]
})
    .then(connection => {
        console.log('connected')
        console.log(connection.getDatabaseName())

        app.use(async (req, res, next) => {
            console.log('******message received*****\n')

            console.log(req.msg.log() + '\n');

            var pedido = await gerarPedido(req.msg);
            criarPedido(pedido, connection);

            next();
        })

        app.use((req, res, next) => {
            console.log('******sending ack*****')
            res.end();
        })

        app.use(function (err, req, res, next) {
            //error handler
            //standard error middleware would be
            console.log('******ERROR*****')
            console.log(err);
            res.ack.addSegment('ERR', err.message);
            res.end();
        });

        app.start(7701);
    })
    .catch(err => { console.log(err) })


function gerarPedido(message) {
    //PID
    var pid = message.getSegment('PID');

    let pedido_id = pid.getField(1); //1 - pedido.id

    let doente_id = pid.getField(2); //2 - pedido.doente.id
    let doente_nome = pid.getField(5); //5 - pedido.doente.nome
    let doente_genero = pid.getField(8); //8 - pedido.doente.genero
    let doente_telefone = pid.getField(13); //13 - pedido.doente.telefone
    let doente_num_utente = pid.getField(18); //18 - pedido.doente.num_utente

    //OBR
    var obr = message.getSegment('OBR');
    let exame_id = obr.getField(1); //1 - pedido.exame.id
    let exame_descricao = obr.getField(13); //13 - pedido.exame.descricao
    let exame_tipo_descricao = obr.getField(44); //44 - pedido.exame.tipo_exame.descricao

    var doente = {
        id: doente_id,
        nome: doente_nome,
        genero: doente_genero,
        telefone: doente_telefone,
        num_utente: doente_num_utente
    };
    var exame = {
        id: exame_id,
        descricao: exame_descricao,
        relatorio: '',
        tipo_exame: exame_tipo_descricao
    };
    var pedido = {
        id: pedido_id,
        doente: doente,
        exame: exame,
        data_hora: new Date(),
        estado: false
    };

    return pedido;
}

async function criarPedido(pedido, connection) {

    var doente = await connection.getRepository('Doente').findOne({ where: { num_utente: pedido.doente.num_utente } });

    if (doente) {
        console.log('IT EXISTS!')
        await connection
            .createQueryBuilder()
            .update('Doente')
            .set({ nome: pedido.doente.nome, telefone: pedido.doente.telefone })
            .where('num_utente = :num_utente', { num_utente: pedido.doente.num_utente })
            .execute();
        pedido.doente = doente;
    }
    await connection.getRepository('Pedido').save(pedido);

}