var hl7 = require('simple-hl7');
var typeorm = require('typeorm');
var client = hl7.Server.createTcpClient('localhost', 7700);

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

        async function runClient() {
            var worklist = await connection.getRepository("Worklist").findOne();

            if (!worklist) {
                console.log('Não existem worklists...\n');
                return;
            }

            console.log(worklist)
            //read worklist
            if (worklist.relatorio.length == 0) {
                //EXAME
                console.log('enviar exame\n');

                var mensagem = criarMensagemRealizacaoExame(worklist);
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
            else {
                //RELATORIO
                console.log('enviar relatorio\n');

                var mensagem = criarMensagemRelatorio(worklist);
                client.send(mensagem, async (err, ack) => {
                    console.log('confirmada recepção\n');
                    await connection.createQueryBuilder().delete().from("Worklist").where("id = :id", { id: worklist.id }).execute();
                    console.log('apagado worklist\n')
                    if (err)
                        console.log(err);
                    else
                        console.log(ack.log());
                });
            }
        }

        setInterval(() => {
            runClient();
        }, 8000);
        runClient();
    })
    .catch(err => { console.log(err) })


function criarMensagemRealizacaoExame(work) {
    var message = new hl7.Message();

    //PID (identificacao pedido)
    message.addSegment('PID', work.numero_pedido)
    //ORC (que tipo de mensagem)
    message.addSegment('ORC', 'EXAME')
    //OBR (estado do pedido)
    message.addSegment('OBR', work.estado_pedido)

    return message;
}

function criarMensagemRelatorio(work) {
    var message = new hl7.Message();

    //PID (identificacao consulta)
    message.addSegment('PID', work.numero_consulta)
    //ORC (que tipo de mensagem)
    message.addSegment('ORC', 'RELATORIO')
    //OBX (relatório)
    message.addSegment('OBX', work.relatorio)

    return message;
}
