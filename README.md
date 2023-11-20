## Quer apostar quanto ?

Aplicação de back-end para o desafio técnico, onde é possível gerenciar o back-end de um site de casa de apostas através de requisições HTTP(s) seguindo a convenção REST.

## Demo

Aqui está o link do deploy do projeto:https://querapostarquanto-api-ra3s.onrender.com

## Como funciona?

Este projeto é uma API REST para atender a aplicação uma casa de apostas. Ela possui três entidades: `participant, game, bet`. As características detas entidades estão no arquivo `schema.prisma`.

Para entidade participant, foram criadas duas rotas:

- GET `/participants`: Retorna todos os participantes e seus respectivos saldos.
- POST `/participants`: Cria um participante com determinado saldo inicial.

Para entidade game, foram criadas quatro rotas:

- POST `/games`: Cria um novo jogo, com placar inicial 0x0 e marcado como não finalizado.
- GET `/games`: Retorna todos os jogos cadastrados.
- POST `/games/:id/finish`: Finaliza um jogo e consequentemente atualiza todas as apostas atreladas a ele, calculando o valor ganho em cada uma e atualizando o saldo dos participantes ganhadores.
- GET `/games/:id`: Retorna os dados de um jogo junto com as apostas atreladas a ele.

Para entidade bet, foi criado apenas uma rota:

- POST `/bet`:Cadastra uma aposta de um participante em um determinado jogo. O valor da aposta deve ser descontado imediatamente do saldo do participante.


## Tecnologias utilizadas

Para este projeto, foram utilizadas:

- Node (versão 18.9.0);
- Express;
- TypeScript;
- Prisma;
- Postgres;
- Jest e Supertest;
- Joi;
- Dotenv;


## Como rodar em desenvolvimento

Para executar este projeto em desenvolvimento, é necessário seguir os passos abaixo:

- Clone este repositório em sua máquina local. git clone https://github.com/niltonrdev/querapostarquanto-api.git
- Acesse o diretório do projeto.
cd querapostarquanto-api
- Baixar as dependências necessárias com o comando: `npm install`;
- Em seguida, criar o arquivo `.env` com base no `.env.example`;
- Para poder executar os testes, será necessário criar um outro arquivo `.env.test` com base no `.env.example`;
- Este arquivo `.env` é composto pelas seguintes propriedades:
```
  DATABASE_URL="postgresql://postgres..."
```
- A propriedade `DATABASE_URL` é usada para fazer a conexão com o banco de dados.

- Será necessário executar o Prisma para criar o banco de dados e as tabelas necessárias. Para isso, execute o comando: `npx prisma migrate dev`;
- Para rodar o projeto em desenvolvimento, execute o comando `npm run dev`;

