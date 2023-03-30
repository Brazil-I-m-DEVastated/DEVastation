# DEVastation 

![Brazil, I'm DEVasted](https://img.shields.io/badge/Brazil-I'm%20DEVasted-green?style=plastic) 

Este é o projeto final do curso de formação **NxtDev da PagoNxt**. O projeto consiste em uma Arquitetura de Microserviços responsável por **detectar fraudes de pagamento**, dividida em três serviços:

- **Clientes**,
- **Prevenção de Fraudes**,
- **Transações**.

## Fluxo dos Serviços

```mermaid
graph TD;
T1(Transação) --> C1(Verifica Dados) -- Inválidos --> T2(Reprova)
C1 -- Válidos --> T3(Valor da Transação x Renda)
T3 -- Maior que 50% --> F1(Análise Humana)
T3 -- Menor que 50% --> T4(Aprova)
F1 --> F2(Aprova)
F1 --> F3(Reprova)

style C1 fill: #ab5c6d, stroke: #000
style F1 fill: #9b963a, stroke: #000
style F2 fill: #9b963a, stroke: #000
style F3 fill: #9b963a, stroke: #000
style T1 fill: #0083a1, stroke: #000
style T2 fill: #0083a1, stroke: #000
style T3 fill: #0083a1, stroke: #000
style T4 fill: #0083a1, stroke: #000
```
<div align="center">

• ![#ab5c6d](https://placehold.co/10x10/ab5c6d/ab5c6d.png) Clientes  •  ![#9b963a](https://placehold.co/10x10/9b963a/9b963a.png) Prevenção de Fraudes  • ![#0083a1](https://placehold.co/10x10/0083a1/0083a1.png) Transações •

</div>


## Tecnologias
<div align="center">

![node.js](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg) ![docker](https://www.vectorlogo.zone/logos/docker/docker-ar21.svg)![mongoDB](https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)   ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white) 

</div>


## Como Rodar a Aplicação

No terminal, clone o projeto. 

    https://github.com/Brazil-I-m-DEVastated/DEVastation.git

Instale as dependências necessárias para cada serviço

    npm install
    
Use o Docker Compose para subir os containers de todos os serviços

    docker-compose up
    
Rode os testes de cada serviço

    npm run test

Acesse a documentação das API:

[![Documentação Clientes](https://img.shields.io/badge/docs-Clientes-ab5c6d?style=plastic)](http://localhost:3001/clients/docs)
[![Documentação Prevenção de Fraudes](https://img.shields.io/badge/docs-Prevenção%20de%20Fraudes-9b963a?style=plastic)](http://localhost:3002/fraudanalysis/docs)
[![Documentação Clientes](https://img.shields.io/badge/docs-Transações-0083a1?style=plastic)](http://localhost:3003/transactions/docs)

Use as coleções do Postman para rodar os Endpoints. 


### Autenticação

Na **API-Gateway** temos uma query do mongo para popular o banco com usuários autenticados. Após rodar a query, utilize uma das contas para acessar a aplicação:

    email: fernandoleandrobernardes@example.com.br
    password: aloha
    
ou 

    email: ianfernandoribeiro@example.com.br
    password: ian123
    
  
## Time 


Squad Clientes
  
  <a href = "https://github.com/isaciqo" ><img src="https://avatars.githubusercontent.com/u/102880481?s=64&v=4" alt="Isac" height="30px"></a>
  <a href = "https://github.com/RenzoOliveira1784" ><img src="https://avatars.githubusercontent.com/u/81581705?s=64&v=4" alt="Renzo" height="30px"></a>
  
Squad Prevenção de Fraude 

  <a href = "https://github.com/Gah2k0" ><img src="https://avatars.githubusercontent.com/u/85766619?s=64&v=4" alt="Gabriel" height="30px"></a>
  <a href = "https://github.com/carolcampelo" ><img src="https://avatars.githubusercontent.com/u/87877044?s=64&v=4" alt="Carolina" height="30px"></a>
  <a href = "https://github.com/NickMendes" ><img src="https://avatars.githubusercontent.com/u/66397994?s=64&v=4" alt="Marina" height="30px"></a>

Squad Transactions

  <a href = "https://github.com/rwsleal" ><img src="https://avatars.githubusercontent.com/u/87544768?s=64&v=4" alt="Richard" height="30px"></a>
  <a href = "https://github.com/monteiroleticia" ><img src="https://avatars.githubusercontent.com/u/48692890?s=64&v=4" alt="Leticia" height="30px"></a>





