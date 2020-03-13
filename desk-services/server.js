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

        app.use(async (req, res, next) => {
            console.log('******message received*****\n')

            console.log(req.msg.log() + '\n');

            var type = (req.msg.getSegment('OBX')) ? 'RELATORIO' : 'EXAME';

            switch (type) {
                case 'EXAME':
                    var pedido_id = req.msg.getSegment('PID').getField(1);
                    atualizarExame(pedido_id, connection);
                    break;
                case 'RELATORIO':
                    var exame_id = req.msg.getSegment('OBR').getField(1);
                    var obx_segments = req.msg.getSegments('OBX');
                    var relatorio = '';
                    for (let index = 0; index < obx_segments.length; index++) {
                        var set_id = obx_segments[index].getField(1);
                        if (set_id >= 6) {
                            relatorio += obx_segments[index].getField(5).trim() + '\n';
                        }
                    }
                    atualizarRelatorio(exame_id, relatorio, connection);
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



function gerarPedidoExame() {
    //OBR
}

function gerarPedidoRelatorio() {
    //TX
}


async function atualizarExame(id, connection) {
    await connection
        .createQueryBuilder()
        .update('Pedido')
        .set({ estado: true })
        .where("id = :id", { id: id })
        .execute();
}

async function atualizarRelatorio(id, relatorio, connection) {
    await connection
        .createQueryBuilder()
        .update('Exame')
        .set({ relatorio: relatorio })
        .where("id = :id", { id: id })
        .execute();
}