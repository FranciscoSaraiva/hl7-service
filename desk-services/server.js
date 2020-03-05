var hl7 = require('simple-hl7');
var typeorm = require('typeorm');
var app = hl7.tcp();

typeorm.createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "desk-services",
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

            var orc = req.msg.getSegment('ORC').getField(1);

            switch (orc) {
                case 'EXAME':
                    console.log('recebi um exame\n')

                    var numero_pedido = req.msg.getSegment('PID').getField(1);
                    var estado = req.msg.getSegment('OBR').getField(1);
                    atualizarExame(numero_pedido, estado, connection);

                    break;
                case 'RELATORIO':
                    console.log('recebi um relatorio\n')

                    var numero_consulta = req.msg.getSegment('PID').getField(1);
                    var relatorio = req.msg.getSegment('OBX').getField(1);
                    atualizarRelatorio(numero_consulta, relatorio, connection);

                    break;
            }

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

        app.start(7700);
    })
    .catch(err => { console.log(err) })


async function atualizarExame(numero_pedido, estado, connection) {
    await connection
        .createQueryBuilder()
        .update('Pedido')
        .set({ estado: estado })
        .where("numero_pedido = :id", { id: numero_pedido })
        .execute();
}

async function atualizarRelatorio(numero_consulta, relatorio, connection) {
    await connection
        .createQueryBuilder()
        .update('Consulta')
        .set({ relatorio: relatorio })
        .where("identificador = :id", { id: numero_consulta })
        .execute();
}