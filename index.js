const app = require("express")();

var fs = require('fs');

var options = {
    key: fs.readFileSync('amcnetwork.key'),
    cert: fs.readFileSync('amcnetwork.cert')
};
//const http = require("http").Server(app)
const http = require("https").Server(options, app)
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["pt"] });
require("ejs");
app.set("view engine", "ejs");
require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Bot online em: ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

manager.addDocument("pt", "Olá", "cumprimento");
manager.addDocument("pt", "Oi", "cumprimento");
manager.addDocument("pt", "Tudo bem", "cumprimento");
manager.addDocument("pt", "Bom dia", "cumprimento");
manager.addDocument("pt", "Boa tarde", "cumprimento");
manager.addDocument("pt", "Boa noite", "cumprimento");
manager.addDocument("pt", "Qual é o seu nome", "nome");
manager.addDocument("pt", "Quem é você", "nome");
manager.addDocument("pt", "Como você está", "bem-estar");
manager.addDocument("pt", "Como você está?", "bem-estar");
manager.addDocument("pt", "Como voce esta", "bem-estar");
manager.addDocument("pt", "Como voce esta?", "bem-estar");
manager.addAnswer("pt", "bem-estar", "Estou bem e pronta para resolver suas dúvidas!");
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
  "Alvaro é o melhor profissional de todos os tempos, ele é muito legal e sabe tudo sobre programação."
);
manager.addAnswer("pt", "cumprimento", "Olá, em que posso ajudar?");
manager.addAnswer("pt", "nome", "Sou a Blue, uma assistente virtual.");
manager.addAnswer(
  "pt",
  "portal",
  `Para acessar o site SESI Educação, siga as instruções abaixo:
1.	Abra o navegador da web em seu computador, tablet ou smartphone.
2.	Digite "https://www.sesieducacao.com.br/" na barra de endereços do seu navegador.
3.	Pressione a tecla "Enter" para carregar a página inicial do site SESI Educação.
Na página inicial do site SESI Educação, você encontrará informações sobre os cursos e programas oferecidos pelo SESI, além de informações sobre como se inscrever e como contatar a instituição para mais informações. `
);
manager.addAnswer(
  "pt",
  "canva",
  `Para utilizar o Canva, siga estes passos:
1.	Acesse o www.canva.com e crie uma conta gratuita.
2.	Após a inscrição, você será levado a página inicial, onde poderá criar e personalizar seu design.
3.	O Canva possui milhares de modelos gratuitos e pagos que você pode escolher.
4.	Clique nos elementos do modelo, como imagens, textos e formas, e edite-os de acordo com suas preferências. Você também pode adicionar seus próprios elementos clicando na opção "Uploads" no painel esquerdo da tela.
5.	No fim, faça o download ou compartilhe o seu design. Quando estiver satisfeito com o seu design, clique no botão "Download" no canto superior direito da tela para baixar o arquivo ou clique em "Compartilhar" para compartilhar o seu design diretamente do Canva.`
);

manager.addDocument("pt", "microsoft teams", "teams");

manager.addAnswer(
  "pt",
  "teams",
  `O Microsoft Teams é uma plataforma de comunicação, que pode ser usada para comunicar-se  com colegas de trabalho, amigos e familiares. Para ser utilizado, siga estas etapas:
1.Crie uma conta usando um endereço de e-mail existente ou criando uma nova
2. Faça o download do aplicativo em https://www.microsoft.com/teams/download-app.
3.Depois de baixado e instalado, entre na sua conta usando seu login.
4. O Microsoft Teams permite que você compartilhe arquivos e trabalhe em projetos em equipe. Você pode criar canais específicos para projetos, compartilhar arquivos e colaborar em tempo real.
Essas são as etapas básicas  para ser usado, á medida que você se torna mais confortável com a plataforma, pode explorar recursos adicionais
`
);

manager.addDocument("pt", "powerpoint", "powerpoint");
manager.addDocument("pt", "power point", "powerpoint");

manager.addDocument(
  "pt",
  "Quais sites podem ser utilizados para fazer slides",
  "slides"
);

manager.addAnswer(
  "pt",
  "slides",
  `•Microsoft Sway 
•Canva 
•Power point 
•Prezi 
•Swipe 
•Deckset
•Photoshop
•Adobe Creative Cloud 

Esses são os principais e mais utilizados  pelas pessoas.
`
);

manager.addAnswer(
  "pt",
  "powerpoint",
  `Para começar a usar o PowerPoint, siga os seguintes passos:
1.	Abra o PowerPoint em seu computador. Você pode encontrá-lo em seu menu de aplicativos ou na área de trabalho.
2.	Na tela inicial do PowerPoint, clique em "Novapresentação" para criar uma nova apresentação em branco. Alternativamente, você pode escolher um modelo de apresentação pré-existente que se encaixe no seu projeto.
3.	Na aba "Inserir", você pode adicionar slides, imagens, vídeos, gráficos, tabelas e muito mais ao seu projeto. Você também pode escolher um design para seus slides na aba "Design".
4.	Na aba "Transições", você pode selecionar efeitos de transição para as mudanças de slide. Na aba "Animações", você pode adicionar animações aos elementos em seus slides.
5.	Na aba "Apresentação de Slides", você pode iniciar a apresentação em tela cheia para ver como ela ficará.
6.	Salve sua apresentação regularmente. Você pode fazer isso clicando em "Arquivo" e depois em "Salvar" ou pressionando Ctrl + S.
Essas são apenas algumas das principais funções do PowerPoint
`
);

manager.addDocument("pt", "ava", "ava");

manager.addAnswer(
  "pt",
  "ava",
  `O AVA, que significa Ambiente Virtual de Aprendizagem, é uma plataforma online que permite a realização de atividades acadêmicas e o acompanhamento do progresso do estudante em um curso ou disciplina
1.	Acesse a plataforma: O acesso ao é geralmente feito através do site da instituição de ensino ou por meio de um link fornecido pelo professor. Certifique-se de ter as informações de login e senha corretas.
2.	O AVA pode oferecer diversas funcionalidades, como acesso a materiais de estudo, fóruns de discussão, chat com professores e colegas, realização de testes e trabalhos, entre outras
3.	Realize as avaliações: As avaliações no AVA podem ser em formato de testes online, trabalhos ou outras atividades. Certifique-se de entender bem as instruções e os critérios de avaliação para realizar as tarefas da melhor maneira possível.

Esses é o processo básico para acessar o Ava e conseguir concluir as avaliações
`
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

manager.addDocument("pt", "office", "office");
manager.addDocument("pt", "microsoft office", "office");
manager.addDocument("pt", "office 365", "office");

manager.addAnswer(
  "pt",
  "office",
  `O Office 365 é uma suíte de aplicativos de produtividade da Microsoft que oferece uma variedade de ferramentas para criação e edição de documentos, planilhas, apresentações e muito mais. Para usar o Office 365, siga as instruções abaixo:
1.	Acesse o site do Office 365 em https://www.office.com/ e faça login com sua conta Microsoft.
2.	Na página inicial do Office 365, você verá todos os aplicativos disponíveis, como Word, Excel, PowerPoint, Outlook, OneDrive, Teams, entre outros. Clique em um aplicativo para abri-lo.
3.	Quando o aplicativo for aberto, você poderá criar um novo documento ou abrir um existente. Para criar um novo documento, clique no botão "Novo" e escolha o tipo de documento que deseja criar.
4.	Use as ferramentas do aplicativo para criar e editar o seu documento. O Office 365 possui muitas funcionalidades, como formatação de texto, tabelas, gráficos, imagens e muito mais.
5.	Quando terminar de editar o documento, salve-o na nuvem do OneDrive ou no seu dispositivo. O OneDrive permite que você acesse seus arquivos de qualquer lugar e dispositivo.
6.	Para compartilhar um documento com outras pessoas, clique no botão "Compartilhar" e adicione as pessoas com quem deseja compartilhar o arquivo. Você pode conceder diferentes níveis de permissão, como visualização ou edição.

Essas são as instruções básicas para a utilização do office 365.
`
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

manager.addDocument("pt", "portal sesi", "portal");

manager.addDocument("pt", "sesi", "sesi");
manager.addAnswer(
  "pt",
  "sesi",
  `O Serviço Social da Indústria (SESI) está com matrículas abertas para o ano letivo de 2022. Atualmente, a rede possui quase 500 escolas espalhadas por todo Brasil e é referência nacional em educação e no preparo dos estudantes para os desafios do mundo do trabalho. Não perca essa oportunidade de começar o seu futuro!
`
);

manager.addDocument("pt", "O que é big data?", "big-data");
manager.addDocument("pt", "Qual a definição de big data?", "big-data");
manager.addDocument("pt", "Como funciona o big data?", "big-data");

manager.addDocument("pt", "codigo fonte", "codigo-fonte");
manager.addDocument("pt", "codigofonte", "codigo-fonte");

manager.addDocument("pt", "sourcecode", "codigo-fonte");

manager.addAnswer(
  "pt",
  "codigo-fonte",
  `O meu código fonte está disponível no meu github:
https://github.com/bryzzen-kibador/Assistente-Virtual-SESI
`
);

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

async function sendDc(pergunta, resposta, id, sala) {
  await client.channels.cache.get("1094700071238508644").send({
    embeds: [
      {
        type: "rich",
        title: `Pergunta Recebida | Blue - Assistente Virtual`,
        description: "",
        color: 0xd3aef0,
        fields: [
          {
            name: `Pergunta:`,
            value: pergunta,
          },
          {
            name: `Resposta:`,
            value: resposta,
          },
          {
            name: `ID:`,
            value: id,
          },
          {
            name: `Nº da Sala`,
            value: sala,
          },
        ],
        footer: {
          text: `Blue - Assistente Virtual`,
          icon_url: `https://pps.whatsapp.net/v/t61.24694-24/316416272_897065378220742_8897064830678422448_n.jpg?ccb=11-4&oh=01_AdS_4a9U_lVnEpx5yD45mtpKcqYTR9Cs336z6vsDfvEORA&oe=64400812`,
        },
      },
    ],
  });
}

app.get("/", async (req, res) => {
  res.render(__dirname + "/index.ejs");
}); 

app.get("/chat", async(req, res) => {
  let i = 0;
  while (rooms[i] != undefined) i++;
  res.render(__dirname + "/chat.ejs", { room: i });
})

io.on("connection", (socket) => {
  //console.log(socket)
  socket.on("join", (room) => {
    console.log(`Usuário ${socket.id} entrou na sala ${room}`);
    socket.join(room);
    rooms.push({ userId: socket.id, roomId: room });
    client.channels.cache.get("1094703389666984048").send({
      embeds: [
        {
          type: "rich",
          title: `Entrada de Usuário | Blue - Assistente Virtual`,
          description: "",
          color: 0xd3aef0,
          fields: [
            {
              name: `ID`,
              value: socket.id,
            },
            {
              name: `Sala:`,
              value: room,
            },
            {
              name: "Endereço de IPv4:",
              value: socket.handshake.headers["x-forwarded-for"] ? socket.handshake.headers["x-forwarded-for"].split(",")[0] : "Não encontrado",
            },
            {
              name: "Navegador:",
              value: socket.handshake.headers["sec-ch-ua"]
                ? socket.handshake.headers["sec-ch-ua"]
                    .split(";")[0]
                    .split(`"`)
                    .join("")
                : "Não definido",
            },
            {
              name: "Horario:",
              value: socket.handshake.time,
            },
          ],
          footer: {
            text: `Blue - Assistente Virtual`,
            icon_url: `https://pps.whatsapp.net/v/t61.24694-24/316416272_897065378220742_8897064830678422448_n.jpg?ccb=11-4&oh=01_AdS_4a9U_lVnEpx5yD45mtpKcqYTR9Cs336z6vsDfvEORA&oe=64400812`,
          },
        },
      ],
    });
  });

  socket.on("chat message", async (data) => {
    const response = await manager.process("pt", data.message);
    if (response.answer == undefined) {
      response.answer = "Desculpe, não entendi sua pergunta.";
    }

    //console.log(data.message)
    //console.log(response.answer)

    io.to(data.room).emit("chat message", {
      message: data.message,
      sender: "user",
    });

    io.to(data.room).emit("chat message", {
      message: response.answer,
      sender: "robot",
    });

    await sendDc(data.message, response.answer, socket.id, data.room);
  });

  socket.on("disconnect", () => {
    const id = rooms.find((f) => f.userId == socket.id)
      ? rooms.find((f) => f.userId == socket.id).roomId
      : "não encontrada";
    console.log(`Usuário ${socket.id} desconectou da sala ${id}.`);
    rooms = rooms.filter((r) => r.userId !== socket.id);

    client.channels.cache.get("1094703389666984048").send({
      embeds: [
        {
          type: "rich",
          title: `Saida de Usuário | Blue - Assistente Virtual`,
          description: "",
          color: 0xd3aef0,
          fields: [
            {
              name: `ID`,
              value: socket.id,
            },
            {
              name: `Sala:`,
              value: id,
            },
          ],
          footer: {
            text: `Blue - Assistente Virtual`,
            icon_url: `https://pps.whatsapp.net/v/t61.24694-24/316416272_897065378220742_8897064830678422448_n.jpg?ccb=11-4&oh=01_AdS_4a9U_lVnEpx5yD45mtpKcqYTR9Cs336z6vsDfvEORA&oe=64400812`,
          },
        },
      ],
    });
  });
});

http.listen(port, async () => {
  await manager.train();
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
