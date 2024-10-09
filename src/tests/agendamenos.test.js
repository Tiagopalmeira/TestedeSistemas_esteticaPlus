const Agendamento = require('../models/agendamento');
const db = require('../config/database');
const http = require('http');

describe('Testes CRUD de Agendamento e Teste de Carga', () => {
  let server;
  const hostname = '127.0.0.1';
  const port = 3010;

  beforeAll(async () => {
    await db.execute('DELETE FROM agendamentos'); //Limpar tabela antes dos testes


    server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('TESTE\n');
    });
    await new Promise((resolve) => server.listen(port, hostname, resolve)); 
  });

  const performLoadTest = (requisicoes) => {
    const inicio = Date.now();
    let completed = 0;

    return new Promise((resolve) => {
      for (let i = 0; i < requisicoes; i++) {
        http.get(`http://${hostname}:${port}`, (res) => {
          completed++;
          if (completed === requisicoes) {
            const tempoTotal = Date.now() - inicio;
            console.log(`Executado ${requisicoes} requisições em ${tempoTotal}ms`);
            console.log(`Tempo médio por requisição: ${tempoTotal / requisicoes}ms`);
            resolve();
          }
        });
      }
    });
  };


  test('Inserção de um novo agendamento', async () => {
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


  test('Leitura de agendamento por nome', async () => {
    const agendamentos = await Agendamento.findByName('João Silva');
    expect(agendamentos.length).toBeGreaterThan(0);
    expect(agendamentos[0].nome_pessoa).toBe('João Silva');
  });


  test('Atualização de agendamento', async () => {
    const novoAgendamento = {
      nome_pessoa: 'João Silva Atualizado',
      contato_telefonico: '987654321',
      email: 'joao.silva@atualizado.com',
      data_agendamento: '2024-10-09'
    };

    const agendamentos = await Agendamento.findByName('João Silva');
    const id_agenda = agendamentos[0].id_agenda;

    const rowsAffected = await Agendamento.update(id_agenda, novoAgendamento);
    expect(rowsAffected).toBe(1);

    const agendamentoAtualizado = await Agendamento.findByName('João Silva Atualizado');
    expect(agendamentoAtualizado[0].nome_pessoa).toBe('João Silva Atualizado');
  });


  test('Exclusão de um agendamento', async () => {
    const agendamentos = await Agendamento.findByName('João Silva Atualizado');
    const id_agenda = agendamentos[0].id_agenda;

    const rowsAffected = await Agendamento.delete(id_agenda);
    expect(rowsAffected).toBe(1);

    const agendamentoDeletado = await Agendamento.findByName('João Silva Atualizado');
    expect(agendamentoDeletado.length).toBe(0);
  });

  
  test('Teste de carga', async () => {
    const requisicoes = 1000; 
    await performLoadTest(requisicoes);
  }, 15000);

  afterAll(async () => {
    await db.execute('DELETE FROM agendamentos');
    await db.end(); 
    server.close(() => {
      console.log('Servidor encerrado após os testes.');
    });
  });
});
