## Quer apostar quanto ?

Bem vindo a esta casa de apostas, onde é possível cadastrar paricipantes, jogos e realizar apostas.

Aqui está o link do deploy do projeto:https://querapostarquanto-api-ra3s.onrender.com

 Instalação

Para executar esse projeto localmente, siga estas etapas:
1 Clone este repositório em sua máquina local.

git clone https://github.com/nilteras/querapostarquanto-api.git

2 Acesse o diretório do projeto.

cd querapostarquanto-api

3 Instale as dependências necessárias.

npm install

4 ajuste as variáveis de ambiente seguindo o .env.example.

5 Inicie o projeto. npm run dev

Funcionalidades

Aqui estão algumas das principais funcionalidades oferecidas por este projeto:

Cadastro participantes: É possível criar um participante com determinado saldo inicial.

Jogos: Cadastro de jogos com placar inicial 0x0. Posteriormente o jogo será finalizado e atualiza todas as apostas atrelada a este jogo.

Apostas: É feito o cadastro de uma aposta de um participante em um determinado jogo, consequentemente o saldo do participante é descontado o valor aplicado, e após a finalização do jogo, se a aposta for vencedora, o saldo do participante atualiza.

