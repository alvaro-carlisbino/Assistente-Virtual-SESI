const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['pt'] });

manager.addDocument('pt', 'Olá', 'cumprimento');
manager.addDocument('pt', 'Oi', 'cumprimento');
manager.addDocument('pt', 'Tudo bem', 'cumprimento');
manager.addDocument('pt', 'Qual é o seu nome', 'nome');
manager.addDocument('pt', 'Quem é você', 'nome');
manager.addDocument('pt', 'Quero acessar o portal do aluno', 'portal');
manager.addDocument('pt', 'Como faço para acessar o portal do aluno', 'portal');
manager.addDocument('pt', 'Como faço para acessar o portal de educação', 'portal');
manager.addDocument('pt', 'Como faço para acessar o portal sesi', 'portal');
manager.addDocument('pt', 'Como faço para acessar o portal do aluno sesi', 'portal');
manager.addAnswer('pt', 'cumprimento', 'Olá, em que posso ajudar?');
manager.addAnswer('pt', 'nome', 'Meu nome é Chatbot, sou um assistente virtual.');
manager.addAnswer('pt', 'portal', 'Para acessar o portal do aluno, basta clicar no link: https://portal.sesi.org.br/');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        manager.process('pt', msg).then(response => {
            console.log(response.answer);
            if (response.answer == undefined) {
                response.answer = "Desculpe, não entendi sua pergunta. Tente novamente."
            }
            io.emit('chat message', response.answer);
        });
        io.emit('chat message', msg);
    });
});

http.listen(port, async () => {
    await manager.train();
    console.log(`Servidor rodando em http://localhost:${port}/`);
});