var hl7 = require('simple-hl7');
var typeorm = require('typeorm');
var client = hl7.Server.createTcpClient('localhost', 7701);

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

        async function runClient() {
            var worklist = await connection.getRepository("Worklist").findOne();

            if (!worklist) {
                console.log('Não existem worklists...\n');
                return;
            }

            var mensagem = criarMensagemPedido(worklist);
            client.send(mensagem, async (err, ack) => {
                console.log('confirmada recepção\n');
                await connection.createQueryBuilder().delete().from("Worklist").where("id = :id", { id: worklist.id }).execute();
                console.log('apagado worklist\n')
                if (err)
                    console.log(err);
                else {
                    console.log(ack.log());
                }
            });
        }

        setInterval(() => {
            runClient();
        }, 8000);
    })
    .catch(err => { console.log(err) })


function criarMensagemPedido(work) {
    var message = new hl7.Message();

    //PID (identificacao pedido)
    message.addSegment('PID', work.numero_pedido, work.numero_consulta)

    return message;
}