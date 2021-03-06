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
    var pedido = work.pedido;
    var message = createMSH(pedido);
    createPID(pedido, message);
    createPV1(pedido, message);
    createORC(pedido, message);
    createOBR(pedido, message);

    return message;
}

function createMSH(pedido) {
    return new hl7.Message( //'^~\&', //MSH.1 - Field Separator	1 [DEFAULT]
        '', //MSH.2 - Encoding Characters	4	
        'DESK-SERVICES', //MSH.3 - Sending Application	227	
        'DESK-SERVICES', //MSH.4 - Sending Facility	227	
        'DESK-MEDIC', //MSH.5 - Receiving Application	227	
        'DESK-MEDIC', //MSH.6 - Receiving Facility	227	
        Date.now(), //MSH.7 - Date/Time Of Message	26	
        '', //MSH.8 - Security	40	
        'ORM', //MSH.9 - Message Type	15	
        pedido.id, //MSH.10 - Message Control ID	20	
        'P', //MSH.11 - Processing ID	3	
        '2.5', //MSH.12 - Version ID	60	
        '', //MSH.13 - Sequence Number	15	
        '', //MSH.14 - Continuation Pointer	180	
        '', //MSH.15 - Accept Acknowledgment Type	2	
        '', //MSH.16 - Application Acknowledgment Type	2	
        'PT', //MSH.17 - Country Code	3	
        '', //MSH.18 - Character Set	16	
        'PT', //MSH.19 - Principal Language Of Message	250	
        '', //MSH.20 - Alternate Character Set Handling Scheme	20	
        '', //MSH.21 - Message Profile Identifier	427
    )
}

function createPID(pedido, message) {
    message.addSegment('PID',
        pedido.id, //PID.1 - Set ID - PID	4	
        pedido.doente.id, //PID.2 - Patient ID	20	
        '', //PID.3 - Patient Identifier List	250	
        '', //PID.4 - Alternate Patient ID - PID	20	
        pedido.doente.nome, //PID.5 - Patient Name	250	
        '', //PID.6 - Mother's Maiden Name	250	
        '', //PID.7 - Date/Time of Birth	26	
        pedido.doente.genero, //PID.8 - Administrative Sex	1	
        '', //PID.9 - Patient Alias	250	
        '', //PID.10 - Race	250	
        '', //PID.11 - Patient Address	250	
        'PT', //PID.12 - County Code	4	
        pedido.doente.telefone, //PID.13 - Phone Number - Home	250	
        '', //PID.14 - Phone Number - Business	250	
        'PT', //PID.15 - Primary Language	250	
        '', //PID.16 - Marital Status	250	
        '', //PID.17 - Religion	250	
        pedido.doente.num_utente, //PID.18 - Patient Account Number	250	
        '', //PID.19 - SSN Number - Patient	16	
        '', //PID.20 - Driver's License Number - Patient	25	
        '', //PID.21 - Mother's Identifier	250	
        '', //PID.22 - Ethnic Group	250	
        '', //PID.23 - Birth Place	250	
        '', //PID.24 - Multiple Birth Indicator	1	
        '', //PID.25 - Birth Order	2	
        'PT', //PID.26 - Citizenship	250	
        '', //PID.27 - Veterans Military Status	250	
        'PT', //PID.28 - Nationality	250	
        '', //PID.29 - Patient Death Date and Time	26	
        '', //PID.30 - Patient Death Indicator	1	
        '', //PID.31 - Identity Unknown Indicator	1	
        '', //PID.32 - Identity Reliability Code	20	
        '', //PID.33 - Last Update Date/Time	26	
        '', //PID.34 - Last Update Facility	241	
        '', //PID.35 - Species Code	250	
        '', //PID.36 - Breed Code	250	
        '', //PID.37 - Strain	80	
        '', //PID.38 - Production Class Code	250	
        '', //PID.39 - Tribal Citizenship	250
    )
}

function createPV1(pedido, message) {
    message.addSegment('PV1',
        '', //PV1.1 - Set ID - PV1	4	
        'I', //PV1.2 - Patient Class	1	
        'INT', //PV1.3 - Assigned Patient Location	80	
        '', //PV1.4 - Admission Type	2	
        '', //PV1.5 - Preadmit Number	250	
        '', //PV1.6 - Prior Patient Location	80	
        '', //PV1.7 - Attending Doctor	250	
        '', //PV1.8 - Referring Doctor	250	
        '', //PV1.9 - Consulting Doctor	250	
        '', //PV1.10 - Hospital Service	3	
        '', //PV1.11 - Temporary Location	80	
        '', //PV1.12 - Preadmit Test Indicator	2	
        '', //PV1.13 - Re-admission Indicator	2	
        '', //PV1.14 - Admit Source	6	
        '', //PV1.15 - Ambulatory Status	2	
        '', //PV1.16 - VIP Indicator	2	
        '', //PV1.17 - Admitting Doctor	250	
        '', //PV1.18 - Patient Type	2	
        '', //PV1.19 - Visit Number	250	
        '', //PV1.20 - Financial Class	50	
        '', //PV1.21 - Charge Price Indicator	2	
        '', //PV1.22 - Courtesy Code	2	
        '', //PV1.23 - Credit Rating	2	
        '', //PV1.24 - Contract Code	2	
        '', //PV1.25 - Contract Effective Date	8	
        '', //PV1.26 - Contract Amount	12	
        '', //PV1.27 - Contract Period	3	
        '', //PV1.28 - Interest Code	2	
        '', //PV1.29 - Transfer to Bad Debt Code	4	
        '', //PV1.30 - Transfer to Bad Debt Date	8	
        '', //PV1.31 - Bad Debt Agency Code	10	
        '', //PV1.32 - Bad Debt Transfer Amount	12	
        '', //PV1.33 - Bad Debt Recovery Amount	12	
        '', //PV1.34 - Delete Account Indicator	1	
        '', //PV1.35 - Delete Account Date	8	
        '', //PV1.36 - Discharge Disposition	3	
        '', //PV1.37 - Discharged to Location	47	
        '', //PV1.38 - Diet Type	250	
        '', //PV1.39 - Servicing Facility	2	
        '', //PV1.40 - Bed Status	1	
        '', //PV1.41 - Account Status	2	
        '', //PV1.42 - Pending Location	80	
        '', //PV1.43 - Prior Temporary Location	80	
        '', //PV1.44 - Admit Date/Time	26	
        '', //PV1.45 - Discharge Date/Time	26	
        '', //PV1.46 - Current Patient Balance	12	
        '', //PV1.47 - Total Charges	12	
        '', //PV1.48 - Total Adjustments	12	
        '', //PV1.49 - Total Payments	12	
        '', //PV1.50 - Alternate Visit ID	250	
        '', //PV1.51 - Visit Indicator	1	
        '', //PV1.52 - Other Healthcare Provider	250
    )
}

function createORC(pedido, message) {
    message.addSegment('ORC',
        'NW', //ORC.1 - Order Control	2	
        '4727374', //ORC.2 - Placer Order Number	22	
        '4727374', //ORC.3 - Filler Order Number	22	
        '', //ORC.4 - Placer Group Number	22	
        '', //ORC.5 - Order Status	2	
        '', //ORC.6 - Response Flag	1	
        '', //ORC.7 - Quantity/Timing	200	
        '', //ORC.8 - Parent Order	200	
        Date.now(), //ORC.9 - Date/Time of Transaction	26	
        'DESK-SERVICES', //ORC.10 - Entered By	250	
        'DESK-SERVICES', //ORC.11 - Verified By	250	
        '', //ORC.12 - Ordering Provider	250	
        '', //ORC.13 - Enterer's Location	80	
        '', //ORC.14 - Call Back Phone Number	250	
        Date.now(), //ORC.15 - Order Effective Date/Time	26	
        '', //ORC.16 - Order Control Code Reason	250	
        '', //ORC.17 - Entering Organization	250	
        '', //ORC.18 - Entering Device	250	
        'DESK-SERVICES', //ORC.19 - Action By	250	
        '', //ORC.20 - Advanced Beneficiary Notice Code	250	
        '', //ORC.21 - Ordering Facility Name	250	
        '', //ORC.22 - Ordering Facility Address	250	
        '', //ORC.23 - Ordering Facility Phone Number	250	
        '', //ORC.24 - Ordering Provider Address	250	
        '', //ORC.25 - Order Status Modifier	250	
        '', //ORC.26 - Advanced Beneficiary Notice Override Reason	60	
        '', //ORC.27 - Filler's Expected Availability Date/Time	26	
        '', //ORC.28 - Confidentiality Code	250	
        '', //ORC.29 - Order Type	250	
        '', //ORC.30 - Enterer Authorization Mode	250
    )
}

function createOBR(pedido, message) {
    message.addSegment('OBR',
        pedido.exame.id, //OBR.1 - Set ID - OBR	4	
        '4727374', //OBR.2 - Placer Order Number	22	
        '4727374', //OBR.3 - Filler Order Number	22	
        '', //OBR.4 - Universal Service Identifier	250	
        '', //OBR.5 - Priority - OBR	2	
        Date.parse(pedido.data_hora), //OBR.6 - Requested Date/Time	26	
        '', //OBR.7 - Observation Date/Time	26	
        '', //OBR.8 - Observation End Date/Time	26	
        '', //OBR.9 - Collection Volume	20	
        '', //OBR.10 - Collector Identifier	250	
        '', //OBR.11 - Specimen Action Code	1	
        '', //OBR.12 - Danger Code	250	
        pedido.exame.descricao, //OBR.13 - Relevant Clinical Information	300	
        '', //OBR.14 - Specimen Received Date/Time	26	
        '', //OBR.15 - Specimen Source	300	
        '', //OBR.16 - Ordering Provider	250	
        '', //OBR.17 - Order Callback Phone Number	250	
        '', //OBR.18 - Placer Field 1	60	
        '', //OBR.19 - Placer Field 2	60	
        '', //OBR.20 - Filler Field 1	60	
        '', //OBR.21 - Filler Field 2	60	
        '', //OBR.22 - Results Rpt/Status Chng - Date/Time	26	
        '', //OBR.23 - Charge to Practice	40	
        '', //OBR.24 - Diagnostic Serv Sect ID	10	
        '', //OBR.25 - Result Status	1	
        '', //OBR.26 - Parent Result	400	
        '', //OBR.27 - Quantity/Timing	200	
        '', //OBR.28 - Result Copies To	250	
        '', //OBR.29 - Parent	200	
        '', //OBR.30 - Transportation Mode	20	
        '', //OBR.31 - Reason for Study	250	
        '', //OBR.32 - Principal Result Interpreter	200	
        '', //OBR.33 - Assistant Result Interpreter	200	
        '', //OBR.34 - Technician	200	
        '', //OBR.35 - Transcriptionist	200	
        '', //OBR.36 - Scheduled Date/Time	26	
        '', //OBR.37 - Number of Sample Containers	4	
        '', //OBR.38 - Transport Logistics of Collected Sample	250	
        '', //OBR.39 - Collector's Comment	250	
        '', //OBR.40 - Transport Arrangement Responsibility	250	
        '', //OBR.41 - Transport Arranged	30	
        '', //OBR.42 - Escort Required	1	
        '', //OBR.43 - Planned Patient Transport Comment	250	
        pedido.exame.tipo_exame.descricao, //OBR.44 - Procedure Code	250	
        '', //OBR.45 - Procedure Code Modifier	250	
        '', //OBR.46 - Placer Supplemental Service Information	250	
        '', //OBR.47 - Filler Supplemental Service Information	250	
        '', //OBR.48 - Medically Necessary Duplicate Procedure Reason.	250	
        '', //OBR.49 - Result Handling
    )
}