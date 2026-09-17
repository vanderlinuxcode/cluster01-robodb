// test_capture.js
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './session_test' })
});

client.on('qr', (qr) => qrcode.generate(qr, { small: true }));

client.on('ready', () => console.log('✅ Bot de teste online! Mande uma mensagem para ver os dados.'));

client.on('message', async (msg) => {
    const contact = await msg.getContact();
    
    console.log('--- DADOS RECEBIDOS ---');
    console.log('ID do Chat (msg.from):', msg.from);
    console.log('Nome do Contato:', contact.pushname || contact.name);
    console.log('Número no Contact (contact.number):', contact.number);
    console.log('ID no Contact (contact.id._serialized):', contact.id._serialized);
    console.log('-----------------------');
});

client.initialize();