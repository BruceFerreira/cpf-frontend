# Documentação do Frontend

Este é o README para o projeto de frontend da aplicação, desenvolvido em React, utilizando Material-UI, Styled Components e Axios.

## Descrição Geral

O frontend deste projeto foi desenvolvido para fornecer uma interface de usuário para interagir com o sistema de cadastro de pessoa física (CPF). Ele se comunica com o backend (cpf-backend) para realizar operações de cadastro e validação de CPF. Além disso, faz uso da API ViaCEP para preencher automaticamente campos de endereço.

## Tecnologias Utilizadas

- React: Biblioteca JavaScript para construção de interfaces de usuário.
- Material-UI: Biblioteca de componentes React para implementação de um design consistente e moderno.
- Styled Components: Biblioteca para estilização de componentes React utilizando CSS-in-JS.
- Axios: Cliente HTTP baseado em Promises para realizar requisições HTTP.

## Comunicação com o Backend

O frontend se comunica com o backend (cpf-backend) através de requisições HTTP utilizando o Axios. Ele realiza operações de cadastro e validação de CPF, bem como qualquer outra interação necessária com o sistema.

## Integração com API ViaCEP

Para preencher campos de endereço de forma automática, o frontend faz chamadas para a API ViaCEP, que fornece informações de CEP e endereço baseadas em consultas realizadas.

## Instruções de Uso

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Clone o repositório do frontend.
3. No diretório do projeto frontend, utilize o Dockerfile para gerar a imagem do frontend com o seguinte comando:
   
   ```bash
   docker build -t cpf-frontend .

4. Execute o seguinte comando para subir o frontend junto com o banco de dados e o backend utilizando Docker Compose:

    ```bash
   ddocker-compose up
O frontend estará disponível na URL http://localhost:5173.

5. Acesse o frontend através do navegador web

## Imagem Docker

A imagem Docker para este projeto está disponível no Docker Hub em [baferreira/cpf-frontend](https://hub.docker.com/repository/docker/baferreira/cpf-frontend/general).

