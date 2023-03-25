const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["pt"] });
require("ejs")
app.set("view engine", "ejs");

manager.addDocument("pt", "Olá", "cumprimento");
manager.addDocument("pt", "Oi", "cumprimento");
manager.addDocument("pt", "Tudo bem", "cumprimento");
manager.addDocument("pt", "Qual é o seu nome", "nome");
manager.addDocument("pt", "Quem é você", "nome");
manager.addDocument("pt", "Quero acessar o portal do aluno", "portal");
manager.addDocument("pt", "Como faço para acessar o portal do aluno", "portal");
manager.addDocument(
    "pt",
    "Como faço para acessar o portal de educação",
    "portal"
);
manager.addDocument("pt", "Como faço para acessar o portal sesi", "portal");
manager.addDocument(
    "pt",
    "Como faço para acessar o portal do aluno sesi",
    "portal"
);
manager.addDocument(
    "pt",
    "Como faço para acessar o portal do aluno do sesi",
    "portal"
);
manager.addDocument("pt", "Como posso fazer para usar o canva", "canva");
manager.addDocument("pt", "Alvaro", "alvaro");
manager.addAnswer(
    "pt",
    "alvaro",
    "Alvaro é o melhor professor de todos os tempos, ele é muito legal e sabe tudo sobre programação."
);
manager.addAnswer("pt", "cumprimento", "Olá, em que posso ajudar?");
manager.addAnswer(
    "pt",
    "nome",
    "Meu nome é Chatbot, sou um assistente virtual."
);
manager.addAnswer(
    "pt",
    "portal",
    "Para acessar o portal do aluno, basta acessar o link: https://portal.sesi.org.br/"
);
manager.addAnswer(
    "pt",
    "canva",
    "Para utilizar o Canva, basta acessar o site ou baixar o aplicativo, criar uma conta ou fazer login, e escolher um modelo ou começar um projeto do zero utilizando as ferramentas disponíveis na plataforma."
);

manager.addDocument("pt", "O que é inteligência artificial?", "ia");
manager.addDocument("pt", "Qual a definição de inteligência artificial?", "ia");
manager.addDocument("pt", "Como funciona a inteligência artificial?", "ia");
manager.addDocument(
    "pt",
    "Qual é a diferença entre machine learning e inteligência artificial?",
    "ia"
);

manager.addAnswer(
    "pt",
    "ia",
    "A inteligência artificial é um campo da ciência da computação que busca criar máquinas capazes de executar tarefas que normalmente exigem inteligência humana, como aprendizado, resolução de problemas e reconhecimento de padrões. Machine learning é uma técnica utilizada na inteligência artificial para permitir que as máquinas aprendam com os dados sem serem explicitamente programadas."
);

manager.addDocument("pt", "O que é deep learning?", "deep-learning");
manager.addDocument("pt", "Como funciona o deep learning?", "deep-learning");
manager.addDocument(
    "pt",
    "Qual a diferença entre machine learning e deep learning?",
    "deep-learning"
);

manager.addAnswer(
    "pt",
    "deep-learning",
    "Deep learning é uma técnica de aprendizado de máquina que utiliza redes neurais artificiais com várias camadas de processamento para aprender representações de dados complexos. É uma forma avançada de machine learning que pode ser usada para reconhecimento de fala, visão computacional e processamento de linguagem natural."
);

manager.addDocument("pt", "O que é big data?", "big-data");
manager.addDocument("pt", "Qual a definição de big data?", "big-data");
manager.addDocument("pt", "Como funciona o big data?", "big-data");

manager.addDocument(
    "pt",
    "Como faço para ver minhas notas no portal do aluno?",
    "notas"
);
manager.addDocument(
    "pt",
    "Onde posso encontrar minhas notas no portal do aluno?",
    "notas"
);
manager.addDocument(
    "pt",
    "Qual é o procedimento para acessar minhas notas no portal do aluno?",
    "notas"
);
manager.addAnswer(
    "pt",
    "notas",
    'Para ver suas notas no portal do aluno do SESI, faça login na plataforma com suas credenciais e clique na opção "Notas" no menu lateral. Lá você encontrará todas as suas notas e o histórico de desempenho nas disciplinas.'
);

manager.addDocument(
    "pt",
    "Como posso ver minha grade de horário no portal do aluno?",
    "horario"
);
manager.addDocument(
    "pt",
    "Onde encontro minha grade de horário no portal do aluno?",
    "horario"
);
manager.addDocument(
    "pt",
    "Qual é o procedimento para acessar minha grade de horário no portal do aluno?",
    "horario"
);
manager.addAnswer(
    "pt",
    "horario",
    'Para ver sua grade de horário no portal do aluno do SESI, faça login na plataforma com suas credenciais e clique na opção "Grade Horária" no menu lateral. Lá você encontrará todas as informações sobre seus horários de aula, turmas e disciplinas.'
);

manager.addDocument("pt", "O que é uma incubadora de startups?", "incubadora");
manager.addDocument(
    "pt",
    "Como funciona uma incubadora de startups?",
    "incubadora"
);
manager.addDocument(
    "pt",
    "Quais são os benefícios de participar de uma incubadora de startups?",
    "incubadora"
);

let rooms = [];

app.get("/", (req, res) => {
    let i = 0;
    while (rooms[i] != undefined) i++;
    res.render(__dirname + "/index.ejs", { room: i });
});


io.on("connection", (socket) => {

    socket.on("join", (room) => {
        console.log(`Usuário ${socket.id} entrou na sala ${room}`);
        socket.join(room);
        rooms.push(room);
    });

    socket.on("chat message", (data) => {
        manager.process("pt", data.message).then((response) => {
            if (response.answer == undefined) {
                response.answer = "Desculpe, não entendi sua pergunta."
            }
            io.to(data.room).emit("chat message", response.answer);
        })
        io.to(data.room).emit("chat message", data.message);
    });

    socket.on("leave", (room) => {
        console.log(`Usuário ${socket.id} saiu da sala ${room}`);
        socket.leave(room);
        rooms.splice(rooms.indexOf(room), 1);
    });
});


http.listen(port, async () => {
    await manager.train();
    console.log(`Servidor rodando em http://localhost:${port}/`);
});
