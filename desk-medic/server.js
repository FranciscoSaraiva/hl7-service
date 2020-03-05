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

        app.use((req, res, next) => {
            console.log('******message received*****')

            console.log(req.msg.log() + '\n');

            var numero_pedido = req.msg.getSegment('PID').getField(1);
            var numero_consulta = req.msg.getSegment('PID').getField(2);
            criarPedido(numero_pedido, numero_consulta, connection);

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


async function criarPedido(numero_pedido, numero_consulta, connection) {
    console.log(numero_consulta)
    await connection
        .createQueryBuilder()
        .insert()
        .into('Consulta')
        .values([{ identificador: numero_consulta, relatorio: '' }])
        .execute();

    await connection
        .createQueryBuilder()
        .insert()
        .into('Pedido')
        .values([{ numero_pedido: numero_pedido, consulta: { identificador: numero_consulta }, estado: false, data_hora: new Date() }])
        .execute();

}