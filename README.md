# Testes CRUD de Agendamento

Este repositório contém testes automatizados para um sistema de agendamentos utilizando Node.js, Express e um banco de dados MySQL. Os testes foram implementados usando a biblioteca Jest e cobrem operações básicas de criação, leitura, atualização e deleção (CRUD) dos agendamentos.

## Estrutura do Projeto

- **`src/`**
  - **`models/`**: Contém a definição do modelo `Agendamento`.
  - **`config/`**: Contém a configuração do banco de dados.
  - **`server.js`**: Arquivo principal que configura e inicia o servidor Express.
  - **`tests/`**: Contém os testes automatizados para as operações CRUD.

## Pré-requisitos

Antes de executar os testes, certifique-se de ter os seguintes pré-requisitos:

- Node.js (versão 14 ou superior)
- MySQL

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seuusuario/seurepositorio.git
   cd seurepositorio

Instale as dependências:

````
npm install
````

Configure o banco de dados MySQL conforme necessário e certifique-se de que a tabela agendamentos esteja criada.

Executando os Testes
Os testes podem ser executados com o comando:

````
npm test
````

## Descrição dos Testes
Os testes cobrem as seguintes funcionalidades:

Inserção de um novo agendamento:

Testa a inserção de um novo agendamento na tabela e verifica se o agendamento foi criado com sucesso.
Leitura de um agendamento pelo nome:

Testa a capacidade de ler um agendamento específico pelo nome da pessoa.
Atualização de um agendamento:

Testa a atualização das informações de um agendamento existente e verifica se as informações foram atualizadas corretamente.
Deleção de um agendamento:

Testa a deleção de um agendamento específico e verifica se ele foi removido com sucesso da tabela.
Teste de carga:

Realiza um teste de carga que envia múltiplas requisições ao servidor para verificar como ele lida com um grande número de requisições simultâneas.
Estrutura dos Testes
Os testes estão localizados no diretório tests/ e foram escritos usando Jest. Cada teste é encapsulado em um bloco test() e utiliza funções assíncronas para lidar com operações de banco de dados.

## Exemplo de um Teste

  ```JS
// Teste de inserção de um novo agendamento
test('Deve inserir um novo agendamento', async () => {
  const novoAgendamento = {
    nome_pessoa: 'João Silva',
    contato_telefonico: '123456789',
    email: 'joao.silva@example.com',
    data_agendamento: '2024-10-08'
  };

  const id_agenda = await Agendamento.create(novoAgendamento);
  expect(id_agenda).toBeDefined();

  const agendamentos = await Agendamento.findAll();
  expect(agendamentos.length).toBe(1);
});
````

Considerações Finais
Sinta-se à vontade para modificar e expandir os testes conforme necessário. Este projeto serve como uma base para implementação de um sistema de agendamentos, e os testes garantem que as operações básicas funcionem corretamente.


Sinta-se à vontade para ajustar qualquer parte conforme necessário!
